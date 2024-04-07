import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator'
import { CategoryEntity } from '@/domain/category.domain';
import { PageData } from '@/domain/commons.domain';
import { NewServiceDTO, ServiceEntity } from '@/domain/service.domain';
import usePost from '@/hooks/usePost';
import servicesService from '@/services/services-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(15).max(150),
  price: z.number().min(0), //todo function to format string to big decimal, con dos decimales
  categoryId: z.number()
})
/*..private String code;
    private String name;
    private String description;
    private BigDecimal price;
    private Long categoryId;
*/

type formType = z.infer<typeof formSchema>

function NewService() {


  const callFunction = servicesService.create.bind(servicesService);
  const { post, data, isLoading, error } = usePost({
    call: callFunction<NewServiceDTO, ServiceEntity>
  });

  const dataLoader = useLoaderData() as PageData<CategoryEntity>;
  console.log(data)

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0.00,
      categoryId: 0,
    }
    
  })

  function onSubmit(values: formType) {
    post(values)
  }

  return (
    <section>
      <Separator className=""/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-2 space-y-2'>
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Service name" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField 
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder='Service description' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField 
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder='Service price' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField 
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      dataLoader.content.map((category, idx) => {
                        return <SelectItem key={idx} value={String(category.id)}>{category.name}</SelectItem>
                      })
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=''>
          <Button type='submit' className='mt-4'>Save</Button>
          </div>
        </form>
      </Form>

    </section>  
  )
}

export default NewService