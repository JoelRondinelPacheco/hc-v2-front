import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditService, ServiceEntity } from "@/domain/service.domain";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { PencilLine } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Close } from "@radix-ui/react-dialog";
import servicesService from "@/services/services-service";
import { EditCategory } from "@/domain/category.domain";

export const serviceColumns: ColumnDef<ServiceEntity>[] = [
    {
        accessorKey: "id",
        header: "Id"
    },
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "category.name",
        header: "Category"
    },
    {
        id: "actions",
        cell: ({ row, table}) => {
          const { name, description, price } = row.original
          const id: number = row.original.id;
    
          const formSchema = z.object({
            name: z.string().min(4).max(50),
            description: z.string().min(4).max(50),
            price: z.number()
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

            let updated = await servicesService.update<EditCategory, ServiceEntity>(serviceEdit)
    
            table.options.meta?.updateData(updated.data);
            //table.setState
          }
    
          return (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <PencilLine className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                    <DialogDescription>
                      Make changes to your category here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} id="catf">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormDescription>Category name</FormDescription>
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
                                <FormDescription>description</FormDescription>
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
                  <Close>
                            <Input
                              className="w-full"
                              type="submit"
                              form="catf"
                              value="submit"
                            />
                          </Close>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          );
        },
      },
    
]