import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditService, ServiceEntity } from "@/domain/service.domain";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { PencilLine } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuthContext } from "@/context/auth-context";
import usePost from "@/hooks/usePost";
import { useEffect, useState } from "react";

export const serviceColumns: ColumnDef<ServiceEntity>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const { name, description, price } = row.original;
      const id: number = row.original.id;
      const { httpService } = useAuthContext();
      const { doPost, response, loading, error } = usePost<EditService, ServiceEntity>(httpService.update, "/service");
      const [open, setOpen] = useState<boolean>(false);

      const formSchema = z.object({
        name: z.string().min(4).max(50),
        description: z.string().min(4).max(250),
        price: z.number().transform(n => Number(n)),
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
          table.options.meta?.updateData(response);
          setOpen(false)
        }
      }, [response])

      return (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={()=> setOpen(true)}>
              <Button variant="outline" size="icon">
                <PencilLine className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Service</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="">
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

                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>
              </div>
              <DialogFooter>
                  <Input
                    className="w-full hover:cursor-pointer"
                    type="submit"
                    form="catf"
                    value={loading ? "Loading" : "Edit"}
                  />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
