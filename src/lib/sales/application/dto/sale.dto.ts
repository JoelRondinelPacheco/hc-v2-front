import { EntityBase } from "@/lib/common/domain/entities/entity-base"
import { SaleItemDTO } from "../../domain/sale.domain"

export type SaleDTO = EntityBase & {
    paymentMethodId: number,
    clientId: number,
    employeeEmail: String,
    saleItems: SaleItemDTO[]
}