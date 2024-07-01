import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator'
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { useGlobalContext } from '@/lib/common/infrastructure/react/global-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import useGetAll from '@/hooks/useGet';
import { useLocation, useParams } from 'react-router-dom';
import { CategoryEntity } from '@/lib/category/domain/category.entity';
import usePost from '@/hooks/usePost';
import { CreateServiceRequest, ServiceEntity } from '@/lib/service/domain/service.entity';
import useUpdate from '@/hooks/useUpdate';

const formSchema = z.object({
  id: z.number().nullable(),
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

function ServiceForm() {

  const { repository, service } = useGlobalContext();
  const params = useLocation();
  const { serviceId } = useParams();
  const [defaultCategory, setDefaultCategory] = useState<string>('')
  const { toast } = useToast();


  const defaultValues = async (serviceId: string | number | undefined) => {
    let serviceIdN = Number(serviceId)
    if (serviceIdN) {
      const res = await service(repository.service).getById(serviceIdN).request;
      const { id, name, description, price, category } = res.data as ServiceEntity;
      return {
        id,
        name,
        description,
        price,
        categoryId: category.id
      }
    } else {
      return {
        id: null,
        name: "",
        description: "",
        price: 0.00,
        categoryId: 0,
      }
    }
  }

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: () => defaultValues(serviceId)
    
  })

  const { data } = useGetAll<CategoryEntity[]>({
    call: service(repository.category).getAll
  });

  useEffect(() => {
    if (serviceId) {
      console.log(form.getValues("categoryId"))
      setDefaultCategory(String(form.getValues("categoryId")))
    }
  }, [data])


  
  const { doPost, loading, error, response } = usePost<CreateServiceRequest, ServiceEntity>(service(repository.service).save);

  function onSubmit(values: formType) {
    const { id, name, description, price, categoryId } = values


      let service: CreateServiceRequest = {
        id: id ? id : 0,
        name: name,
        description: description,
        price: price,
        categoryId: categoryId
      }  

      doPost(service);
 
  }

 /*

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
*/
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
                <Select onValueChange={field.onChange} defaultValue={defaultCategory}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      data?.map((category, idx) => {
                        return <SelectItem key={idx} value={String(category.id)} defaultValue={defaultCategory}>{category.name}</SelectItem>
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

export default ServiceForm