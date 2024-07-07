import { ClientEntity } from "@/lib/user/domain/client.entity";
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