import { Button } from "@/components/ui/button";
import { CategoryEntity } from "@/domain/category.domain";
import { ColumnDef } from "@tanstack/react-table";
import { PencilLine } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

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
    cell: ({ row }) => {
      const id: number = row.original.id;

      const params = useLocation();

      return (
        <>
          <Link to={`${params.pathname}/edit/${id}`}>
            <Button variant="outline" size="icon">
              <PencilLine className="h-4 w-4" />
            </Button>
          </Link>
        </>
      );
    },
  },
];
