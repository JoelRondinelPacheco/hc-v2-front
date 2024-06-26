import { Button } from "@/components/ui/button";
import { CategoryBase, CategoryEntity } from "@/domain/category.domain";
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
import categoryService from "@/services/category-service";
import { useGlobalContext } from "@/lib/common/infrastructure/react/global-context";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import usePost from "@/hooks/usePost";

function CategoryForm() {

  const { role } = useGlobalContext();
  const categoryServiceRef = useRef(categoryService(role));
  const callFunction = categoryServiceRef.current.create.bind(categoryServiceRef.current)<CategoryBase, CategoryEntity>;
  const navigate = useNavigate();
  const { toast } = useToast();

  const { repository, service } = useGlobalContext();


  const { categoryId } = useParams();

  
  const { doPost, response, loading, error } = usePost<CategoryBase, CategoryEntity>(callFunction);

  const formSchema = z.object({
    id: z.number().nullable(),
    name: z.string().min(4).max(50),
    description: z.string().min(4).max(50),
  });

  const defaultValues = async (categoryId: number | undefined) => {
    if (categoryId) {
      const res = await service(repository.category).getById(categoryId).request;
      return res.data;
    } else {
      return {
        id: null,
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {

    let cat: CategoryBase = {
      name: values.name,
      description: values.description,
    };


    const a = form.getValues()

    return doPost(cat);
/*
    console.log(response)
    if (!loading && !error) {
      toastSuccess();
    }

    if (!loading && error) {
      toastError();
    }*/
  }


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
