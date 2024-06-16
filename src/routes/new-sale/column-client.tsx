
import { ClientEntity } from "@/domain/client.domain";
import { ColumnDef } from "@tanstack/react-table";

export const columnsClientsNewSales: ColumnDef<ClientEntity>[] = [
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