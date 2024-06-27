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
import { useGlobalContext } from "@/lib/common/infraestructure/react/auth-context";
import {
  CreateClientRequest,
  CreateClientResponse,
} from "@/domain/client.domain";
import usePost from "@/hooks/usePost";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const formSchema = z.object({
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
  const { httpService } = useGlobalContext();
  const params = useLocation();
  const isNewEmployee = params.pathname.endsWith("/new-employee");
  const endpoint = isNewEmployee ? "/employee" : "/client";
  const { doPost, response, loading, error } = usePost<
    CreateClientRequest,
    CreateClientResponse
  >(httpService.create, endpoint);

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      dni: "",
      birthday: undefined,
    },
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
            {isNewEmployee && (
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
