import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
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
import UnderConstruction from "@/components/under-construction";
import { useGlobalContext } from "@/lib/common/infrastructure/react/global-context";
import {
  CreateClientRequest,
  CreateClientResponse,
} from "@/domain/client.domain";
import usePost from "@/hooks/usePost";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ClientEntity } from "@/lib/user/domain/client.entity";
import { EmployeeEntity } from "@/lib/user/domain/employee.entity";
import { useEffect, useState } from "react";
import { Repository } from "@/lib/common/domain/repository";
import { MockDBResponse } from "@/lib/common/domain/mock-db-response";
import { AxiosResponse } from "axios";

const formSchema = z.object({
  id: z.number().nullable(),
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
    userId = Number(clientId)
  } else if (employeeId) {
    userId = Number(employeeId);
  } else {
    userId = undefined;
  }


  const isEmployeeForm = params.pathname.includes("employee");

  let repo: Repository<ClientEntity> | Repository<EmployeeEntity>;
  if (isEmployeeForm) {
    repo = repository.employee
  } else {
    repo = repository.client
  }
  /*
  const { doPost, response, loading, error } = usePost<
    CreateClientRequest,
    CreateClientResponse
  >(isNewEmployee ? service(repository.employee).save : service(repository.client).save);*/

  //todo custom hook
  const getById = async (userId: number | undefined) => {
    if (userId) {
      const res = await service(repo).getById(userId).request
      const data = res.data;
      const {id, name, lastname, email, dni, birthday } = data.person
      let response: formType = {
        id: id,
        name: name,
        lastname: lastname,
        email: email,
        dni: String(dni),
        birthday: birthday
      }
      if ('salary' in data) {
        response = {...response, salary: data.salary}
      }
      return response;
    } else {
      let response: formType =  {
        id: null,
        name: "",
        lastname: "",
        email: "",
        dni: "",
        birthday: new Date(),
      }
      if (isEmployeeForm) {
        response = {...response, salary: ""}
      }
      return response;
    }
  }
  /*
  useEffect(() => {
    
    getById(Number(clientId));
  }, [])*/

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: () => getById(Number(userId)),

  });

  const onSubmit = async (values: formType) => {
    let postValues: CreateClientRequest = {
      ...values, //todo update
      dni: Number(values.dni),
      address: "",
      phoneNumber: 0,
    };
    /*await doPost(postValues);
    if (response !== null && !loading && !error) {
      form.reset();
      console.log("OKkkkkkk");
      console.log(response);
    }*/
    console.log(values);
    console.log(postValues);
  };

  return (
    <>
    <h2>{isEmployeeForm ? "EMPL" : "CLIENT"}</h2>
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
