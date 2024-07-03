import { Button } from "@/components/ui/button";
import { ServiceEntity } from "@/lib/service/domain/service.entity";
import { ColumnDef } from "@tanstack/react-table";
import { PencilLine } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

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
    cell: ({ row }) => {
      const { id } = row.original;
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
