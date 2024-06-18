import { Checkbox } from "@/components/ui/checkbox";
import { PaymentMethodEntity } from "@/domain/payment-method.domain";
import { ColumnDef } from "@tanstack/react-table";

export const PaymentMethodColumns: ColumnDef<PaymentMethodEntity>[] = [
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
        accessorKey: "type",
        header: "Name"
    },
    {
        accessorKey: "interest",
        header: "Interest"
    }
]