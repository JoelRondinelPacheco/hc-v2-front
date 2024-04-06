import {
  Dialog,
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
import { Close } from "@radix-ui/react-dialog";
import categoryService from "@/services/category-service";

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
          name: name,
          description: description,
        },
      });

      async function onSubmit(values: z.infer<typeof formSchema>) {
        let cat: EditCategory = {
          id: id,
          name: values.name,
          description: values.description,
        };

        
        let dat = await categoryService.update<EditCategory, CategoryEntity>(cat);
        console.log("RESPONSE")
        console.log(dat)
        table.options.meta?.updateData(dat.data);
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
                <div className="items-center gap-4">
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
];
