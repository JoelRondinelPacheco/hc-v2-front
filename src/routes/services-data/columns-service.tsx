import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ServiceEntity } from "@/domain/service.domain";
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
          const name: string = row.original.name;
          const description: string = row.original.description;
          const id: number = row.original.id;
    
          const formSchema = z.object({
            name: z.string().min(4).max(50),
            description: z.string().min(4).max(50),
          });
    
          const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
              name: "",
              description: "",
            },
          });
    
          async function onSubmit(values: z.infer<typeof formSchema>) {
            let cat: ServiceEntity = {
              id: id,
              name: values.name,
              code: "asdasd",
              description: "dasda",
              price: 12,
              createdAt: "adad",
              updatedAt:"adsasd",
              category: {
                description: "asdasd",
                name: "adad",
                id: 123
              }
            };
    
            table.options.meta?.updateData(cat);
            table.setState
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
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} id="catf">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input defaultValue={name} {...field} />
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
                                  <Input defaultValue={description} {...field} />
                                </FormControl>
                                <FormDescription>description</FormDescription>
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