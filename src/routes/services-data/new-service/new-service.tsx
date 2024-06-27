import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator'
import { ToastAction } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { useGlobalContext } from '@/lib/common/infraestructure/react/auth-context';
import { CategoryEntity } from '@/domain/category.domain';
import { NewServiceDTO, ServiceEntity } from '@/domain/service.domain';
import useGet from '@/hooks/useGet';
import usePost from '@/hooks/usePost';
import categoryService from '@/services/category-service';
import servicesService from '@/services/services-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(15).max(150),
  price: z.string().min(0).transform((val) => Number(val)), //todo function to format string to big decimal, con dos decimales
  categoryId: z.string().transform((val) => Number(val))
})
/*..private String code;
    private String name;
    private String description;
    private BigDecimal price;
    private Long categoryId;
*/

type formType = z.infer<typeof formSchema>

function NewService() {

  const { role } = useGlobalContext();
  const servicesServiceRef = useRef(servicesService(role));
  const categoriesServiceRef = useRef(categoryService(role));
  
  const { toast } = useToast();

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0.00,
      categoryId: 0,
    }
    
  })

  const categoryCallFunction = categoriesServiceRef.current.getPageParams.bind(categoriesServiceRef.current);
/*
  usePagination<CategoryEntity>({
    intialPage: {
      pageIndex: 0,
      pageSize: 10
    },
    call: categoryCallFunction<CategoryEntity>
  })*/

  const {pageData} = useGet({
    call: categoryCallFunction<CategoryEntity>,
    initialQuery: [
      {
        key: "pageIndex",
        value: "0"
      },
      {
      key: "pageSize",
      value: "100"
      }
    ]
  });



  const callFunction = servicesServiceRef.current.create.bind(servicesServiceRef.current);
  const { doPost, loading, error, response } = usePost<NewServiceDTO, ServiceEntity>(callFunction);
  

  function onSubmit(values: formType) {
    console.log(values)
    doPost(values); 
  }

  useEffect(() => {
    
    if (response !== null && !loading && !error) {
      form.reset();
      toast({
        title: "Servicio agregado.",
        description: "Puedes crear uno nuevo o volver atras.",
        action: <ToastAction altText="Try again">Volver atras</ToastAction>,
      })
    }

    if (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })

    }
  }, [response])

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
                      pageData.map((category, idx) => {
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
      <Toaster />

    </section>  
  )
}

export default NewService