import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth-context";
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
import useLogin from "@/hooks/useAuth";
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(50),
});

export default function LoginCard() {
  const { dispatch } = useAuthContext();
  const nav = useNavigate();

  const defaultValues = {
    email: "",
    password: "",
  };

  const { login, response, error } = useLogin(defaultValues);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("LLAMO");
    login({
      email: values.email,
      password: values.password,
    });
  }

  useEffect(() => {
    if (!error) {
      dispatch({
        type: "LOGIN",
        payload: response,
      });
      nav("/hc-v2-front");
    }
  }, [response]);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
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
                  <FormLabel>Email</FormLabel>
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
        {error && (<div className="pt-4">
          <Alert >
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>
              El login de usuarios se encuentra desactivado.
            </AlertDescription>
          </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
