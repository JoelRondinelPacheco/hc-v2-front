import { useGlobalContext } from '@/lib/common/infrastructure/react/global-context';
import { EditService, ServiceEntity } from '@/domain/service.domain';
import usePost from '@/hooks/usePost';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from "zod";


const EditServiceForm = (props: EditService) => {
    const { id, name, description, price } = props;
    const { httpService } = useGlobalContext();
      const { doPost, response, loading, error } = usePost<EditService, ServiceEntity>(httpService.update, "/service");

      const formSchema = z.object({
        name: z.string().min(4).max(50),
        description: z.string().min(4).max(250),
        price: z.string().transform(n => Number(n)),
      });

      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: name,
          description: description,
          price: price,
        },
      });


      async function onSubmit(values: z.infer<typeof formSchema>) {
        let serviceEdit: EditService = {
          id: id,
          name: values.name,
          description: values.description,
          price: values.price,
        };
        doPost(serviceEdit);
        //table.setState
      }

      useEffect(() => {
        if (response !== null && !loading && !error) {
          console.log(response)
          form.reset({
            name: name,
            description: description,
            price: price
          })
          //table.options.meta?.updateData(response);
        }
      }, [response])

  return (
    <div>EditServiceForm</div>
  )
}

export default EditServiceForm