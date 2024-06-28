import { Button } from "@/components/ui/button";
import { EmployeeEntity } from "@/domain/client.domain";
import { ColumnDef } from "@tanstack/react-table";
import { PencilLine } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const employeeColumns: ColumnDef<EmployeeEntity>[] = [
    {
        accessorKey: "person.name",
        header: "Name"
    },
    {
        accessorKey: "person.lastname",
        header: "Last name"
    },
    {
        accessorKey: "person.email",
        header: "Email",
    },
    {
        accessorKey: "salary",
        header: "Salary"
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const { id } = row.original;
    
          const params = useLocation();
    
          return (
              <Link to={`${params.pathname}/edit/${id}`}>
                <Button variant="outline" size="icon">
                  <PencilLine className="h-4 w-4" />
                </Button>
              </Link>
          );
        },
      },
    
]