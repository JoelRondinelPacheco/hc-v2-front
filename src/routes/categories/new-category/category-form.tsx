import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useGlobalContext } from "@/context/global-context";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import usePost from "@/hooks/usePost";
import { CategoryEntity, CreateCategoryRequest } from "@/lib/category/domain/category.entity";
import { CategoryDTO } from "@/lib/category/application/dto/category.dto";

function CategoryForm() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { repository, service } = useGlobalContext();


  const { categoryId } = useParams();

  
  const { doPost, response, loading, error } = usePost<CategoryDTO, CategoryEntity>(service.category(repository.category).save);

  const formSchema = z.object({
    id: z.number(),
    name: z.string().min(4).max(50),
    description: z.string().min(4).max(150),
  });

  const defaultValues = async (categoryId: number | undefined) => {
    if (categoryId) {
      const res = await service.category(repository.category).getById(String(categoryId)).request;
      return res.data as CategoryEntity;
    } else {
      return {
        id: 0,
        name: "",
        description: ""
      }
    }
  }
  const form = useForm<z.infer<typeof formSchema>, z.infer<typeof formSchema>, z.infer<typeof formSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: () => defaultValues(Number(categoryId))
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    let cat: CategoryDTO = {
      id: values.id ? values.id : 0,
      name: values.name,
      description: values.description,
    };
    console.log(cat)
    await doPost(cat);
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset({...response})
    }
  }, [form.formState, response])


  useEffect(() => {
    if (response !== null && !loading && !error) {
      form.reset()
      toast({
        title: "Categoria agregada.",
        description: "Puedes crear una nueva categoria o volver atras.",
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

  const toastError = () => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
      //action: <ToastAction altText="Try again">Try again</ToastAction>,
    })
  }

  const toastSuccess = () => {
    toast({
      variant: "default",
      title: "Categoria agregada!",
      description: "Puedes volver atras o agregar una nueva.",
      action: <ToastAction altText="Volver" onClick={() => navigate("/hc-v2-front/category")}>Volver</ToastAction>,
    })
  }

 

  return (
    <div className="grid gap-4">
      <div className="items-center gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="category-form">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-4">
            <Button variant="default">Guardar</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CategoryForm;
