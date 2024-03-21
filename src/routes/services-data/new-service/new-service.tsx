import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(15).max(150),
  price: z.number(), //todo function to format string to big decimal, con dos decimales
  categoryId: z.number()
})

type formType = z.infer<typeof formSchema>

function NewService() {

  const data = useLoaderData();
  console.log(data)

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    //defaultValues es necesario
    
  })

  function onSubmit(values: formType) {
    console.log(values)
  }

  return (
    <section>
      {
        data?.content.map((cont, i) => {
          return <div key={i}><h1>{cont.name}</h1><h2>{cont.description}</h2></div>
        })
      }
      <Separator className=""/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Service name" {...field}/>
                </FormControl>
                <FormDescription>
                  Name for the service
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Enviar</Button>
        </form>
      </Form>

    </section>  
  )
}

export default NewService