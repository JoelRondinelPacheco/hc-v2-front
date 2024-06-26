import { EntityBase } from "@/lib/common/domain/entity-base";


export interface PaymentMethodEntity extends EntityBase {
    type: string,
    interest: number
}