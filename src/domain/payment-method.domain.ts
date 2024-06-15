import { EntityBase } from "./commons.domain"

export type PaymentMethodEntity = EntityBase & {
    id: number,
    type: string,
    interest: number,
}