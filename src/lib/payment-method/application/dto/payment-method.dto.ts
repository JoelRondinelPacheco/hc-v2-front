import { EntityBase } from "@/lib/common/domain/entities/entity-base"

export type PaymentMethodDTO = EntityBase & {
    type: string,
    interest: number
}