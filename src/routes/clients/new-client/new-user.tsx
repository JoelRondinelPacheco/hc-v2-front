import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGlobalContext } from "@/lib/common/infrastructure/react/global-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { format, parse } from "date-fns";
import {
  ClientEntity,
  CreateClientRequest,
} from "@/lib/user/domain/client.entity";
import {
  CreateEmployeeRequest,
  EmployeeEntity,
} from "@/lib/user/domain/employee.entity";
import usePost from "@/hooks/usePost";
import { PersonEntity } from "@/lib/user/domain/person.entity";
import { Repository } from "@/lib/common/domain/repository";
import { useEffect } from "react";

const formSchema = z.object({
  id: z.number().nullable(),
  personId: z.number().nullable(),
  name: z.string().min(3),
  lastname: z.string().min(3),
  email: z.string().email(),
  //address??
  dni: z.string(),
  birthday: z.date(), //todo to date
  salary: z.string().optional(),
  //phone number
});

type formType = z.infer<typeof formSchema>;

const NewUser = () => {
  const { repository, service } = useGlobalContext();

  const params = useLocation();
  const { clientId, employeeId } = useParams();

  let userId: number | undefined;
  if (clientId) {
    userId = Number(clientId);
  } else if (employeeId) {
    userId = Number(employeeId);
  } else {
    userId = undefined;
  }

  const isEmployeeForm = params.pathname.includes("employee");

  const {
    doPost: postClient,
    response: responseClient,
    loading: loadingClient,
    error: errorClient,
  } = usePost<CreateClientRequest, ClientEntity>(
    service(repository.client).save
  );
  const {
    doPost: postEmployee,
    response: responseEmployee,
    loading: laodingEmployee,
    error: errorEmployee,
  } = usePost<CreateEmployeeRequest, EmployeeEntity>(
    service(repository.employee).save
  );

  //todo custom hook
  const getById = async (userId: number | undefined) => {
    if (userId) {
      if (isEmployeeForm) {
        const res = await service(repository.employee).getById(userId).request;
        const data = res.data as EmployeeEntity;
        
        const {
          id: personId,
          name,
          lastname,
          email,
          dni,
          birthday,
        } = data.person;
        const { id, salary } = data;
        console.log(birthday)
        let response: formType = {
          id: id,
          personId: personId,
          name: name,
          lastname: lastname,
          email: email,
          dni: String(dni),
          birthday: birthday,
          salary: String(salary),
        };
        return response;
      } else {
        const res = await service(repository.client).getById(userId).request;
        const data = res.data as ClientEntity;

        const {
          id: personId,
          name,
          lastname,
          email,
          dni,
          birthday,
        } = data.person;
        const { id } = data;
        let response: formType = {
          id: id,
          personId: personId,
          name: name,
          lastname: lastname,
          email: email,
          dni: String(dni),
          birthday: birthday,
        };
        return response;
      }
    } else {
      let response: formType = {
        id: null,
        personId: null,
        name: "",
        lastname: "",
        email: "",
        dni: "",
        birthday: new Date(),
      };
      if (isEmployeeForm) {
        response = { ...response, salary: "" };
      }
      return response;
    }
  };
  /*
  useEffect(() => {
    
    getById(Number(clientId));
  }, [])*/

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: () => getById(Number(userId)),
  });

  const onSubmit = async (values: formType) => {
    const { id, personId, name, lastname, email, dni, birthday, salary } =
      values;
    if (isEmployeeForm) {
      let postValues: CreateEmployeeRequest = {
        id: id ? id : 0,
        personId: personId ? personId : 0,
        name: name,
        lastname: lastname,
        email: email,
        address: "",
        phoneNumber: 0,
        dni: Number(dni),
        birthday: birthday,
        roleId: null,
        password: null,
        salary: salary ? Number(salary) : 0,
      };
      console.log(postValues)
     postEmployee(postValues);
    } else {
      let postValues: CreateClientRequest = {
        id: id ? id : 0,
        personId: personId ? personId : 0,
        name: name,
        lastname: lastname,
        email: email,
        address: "",
        phoneNumber: 0,
        dni: Number(dni),
        birthday: birthday,
        roleId: 1,
        password: "password1234",
      };
      console.log(postValues)
     postClient(postValues);
    }
  };

  useEffect(() => {
    //todo update form
  }, [responseClient, responseEmployee])

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-4">
            <div className="grow">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grow">
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="grow">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {isEmployeeForm && (
              <div className="grow">
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="dni"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DNI</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="pt-0.5">Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex align-end">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default NewUser;
