import { Checkbox } from "@/components/ui/checkbox";
import { ServiceEntity } from "@/lib/service/domain/service.entity";

import { ColumnDef } from "@tanstack/react-table";

export const serviceColumnsSelect: ColumnDef<ServiceEntity>[] = [
  {
    id: "select",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
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
  }
];
