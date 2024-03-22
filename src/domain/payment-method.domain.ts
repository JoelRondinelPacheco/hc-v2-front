import { EntityBase } from "./commons.domain"

export type PaymentMethod = EntityBase & {
    id: number,
    type: string,
    interest: number,
}