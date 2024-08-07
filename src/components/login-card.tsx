import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/global-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import useLogin from "@/hooks/useLogin";
import useAuthInfo from "@/hooks/useAuthInfo";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(50),
});

export default function LoginCard() {
  const {role} = useAuthInfo()
  const { dispatch } = useGlobalContext();
  const nav = useNavigate();

  const defaultValues = {
    email: "",
    password: "",
  };

  const { login, loading, error, response } = useLogin(dispatch);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    if (!loading) {
    await login(values);
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login {role}</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
        {/*error && (<div className="pt-4">
          <Alert >
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>
              El login de usuarios se encuentra desactivado.
            </AlertDescription>
          </Alert>
          </div>
        )*/}
      </CardContent>
    </Card>
  );
}
