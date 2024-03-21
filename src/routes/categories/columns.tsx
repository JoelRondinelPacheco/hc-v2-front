import { Button } from "@/components/ui/button";
import { CategoryEntity } from "@/domain/category.domain";
import { ColumnDef } from "@tanstack/react-table";



export const columns: ColumnDef<CategoryEntity>[] = [
  {
    accessorKey: "id",
    header: "Id column",
  },
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
      cell: ({ row }) => {
        //const id: string = row.getValue("name")
        const id: string = row.original.description
   
        return (
          <Button>{id}</Button>
         
        )
      },
    },
  ]
