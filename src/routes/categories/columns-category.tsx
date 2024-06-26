import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CategoryEntity, EditCategory } from "@/domain/category.domain";
import { ColumnDef } from "@tanstack/react-table";
import { PencilLine } from "lucide-react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useAuthContext } from "@/context/auth-context";
import usePost from "@/hooks/usePost";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export const columnsCategory: ColumnDef<CategoryEntity>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },

  {
    id: "actions",
    cell: ({ row, table}) => {
      const { httpService } = useAuthContext();
      const { doPost, response, loading, error } = usePost<CategoryEntity, CategoryEntity>(httpService.update, "/category");
      const id: number = row.original.id;
      const [open, setOpen] = useState(false);
      const formSchema = z.object({
        name: z.string().min(4).max(50),
        description: z.string().min(4).max(150),
      });

      const { toast } = useToast()


      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: row.original.name,
          description: row.original.description,
        },
      });

      async function onSubmit(values: z.infer<typeof formSchema>) {
        let cat: EditCategory = {
          id: id,
          name: values.name,
          description: values.description,
        };

        doPost(cat);
      }

      useEffect(() => {
        if (response !== null && !loading && !error) {
          form.reset({
            name: response.name,
            description: response.description
          })
          table.options.meta?.updateData(response);
          setOpen(false)
          toast({
            title: "Categoria editada",          })
        }
      }, [response])

      return (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
              <Button variant="outline" size="icon">
                <PencilLine className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Category</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="items-center">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} id="catf" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
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
                          </FormItem>
                        )}
                      />

                      
                    </form>
                  </Form>
                </div>
              </div>
              <DialogFooter>
                {/*<DialogClose asChild >*/}
                        <Input
                          className="w-full hover:cursor-pointer"
                          type="submit"
                          form="catf"
                          value={loading ? "Loading" : "Edit"}
                        />
                        {/*</DialogClose>*/}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
