import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/auth-context"
import { ActionTypes } from "@/reducers/auth-reducer"
import { login } from "@/services/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { useNavigate } from "react-router-dom"


const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(50)
})


export default function LoginCard() {

  const { dispatch } = useAuthContext();
  const nav = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    let send = login(values.email, values.password)
    dispatch({
      type: ActionTypes.LOGIN,
      payload: send
    })

    nav("/")

  }

  



  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter your email and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription>
                  This is your email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          >
          </FormField>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormDescription>
                  This is your password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
        </Form>
      </CardContent>
    </Card>
  )
}

