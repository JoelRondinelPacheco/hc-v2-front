import { ServiceEntity } from "@/domain/service.domain";
import { ColumnDef } from "@tanstack/react-table";

export const serviceColumns: ColumnDef<ServiceEntity>[] = [
    {
        accessorKey: "id",
        header: "Id"
    },
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "category.name",
        header: "Category"
    }
]