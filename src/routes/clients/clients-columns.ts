
import { ClientEntity } from "@/domain/client.domain";
import { ColumnDef } from "@tanstack/react-table";

export const clientColumns: ColumnDef<ClientEntity>[] = [
    {
        accessorKey: "person.name",
        header: "Name"
    },
    {
        accessorKey: "person.lastname",
        header: "Last name"
    },
    {
        accessorKey: "person.dni",
        header: "DNI"

    },
    {
        accessorKey: "person.email",
        header: "email",
    },
    
]