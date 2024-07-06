import { EntityBase } from "@/domain/commons.domain";

export type PaymentMethodDTO = EntityBase & {
    type: string,
    interest: number
}