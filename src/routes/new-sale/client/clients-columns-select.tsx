import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ClientEntity } from "@/lib/user/domain/client.entity";

export const clientColumnsSelect: ColumnDef<ClientEntity>[] = [
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
    accessorKey: "person.name",
    header: "Name",
  },
  {
    accessorKey: "person.lastname",
    header: "Last name",
  },
  {
    accessorKey: "person.dni",
    header: "DNI",
  },
  {
    accessorKey: "person.email",
    header: "email",
  },
];
