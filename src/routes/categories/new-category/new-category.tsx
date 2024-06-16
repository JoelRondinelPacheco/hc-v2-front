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
import usePost from "@/hooks/usePost";
import { useAuthContext } from "@/context/auth-context";
import { useRef } from "react";

function NewCategory() {
  const { role } = useAuthContext();
  const categoryServiceRef = useRef(categoryService(role));
  const callFunction = categoryServiceRef.current.create.bind(categoryServiceRef.current)<CategoryBase, CategoryEntity>;
  
  const { post, data, isLoading, error } = usePost({
    call: callFunction,
    initialData: {
      name: "",
      description: ""
    }
  });

  const formSchema = z.object({
    name: z.string().min(4).max(50),
    description: z.string().min(4).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    let cat: CategoryBase = {
      name: values.name,
      description: values.description,
    };
    console.log(data)

    //post(cat);
    post(cat);
    console.log("RESPONSE");
    console.log(data)

    //table.options.meta?.updateData(dat.data);
    //table.setState
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
            <Button variant="default">ENVIAR</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default NewCategory;
