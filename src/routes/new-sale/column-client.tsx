
import { Client } from "@/domain/client.domain";
import { ColumnDef } from "@tanstack/react-table";

export const columnsClientsNewSales: ColumnDef<Client>[] = [
    {
        accessorKey: "person.name",
        header: "Name"
    },
    {
        accessorKey: "person.email",
        header: "email",
    },
    {
        accessorKey: "person.lastname",
        header: "Lastname"
    }
]