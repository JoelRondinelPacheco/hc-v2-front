import { EmployeeEntity } from "@/domain/client.domain";
import { ColumnDef } from "@tanstack/react-table";

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
    }
]