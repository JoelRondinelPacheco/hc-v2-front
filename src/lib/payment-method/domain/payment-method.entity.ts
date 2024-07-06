import { EntityBase } from "@/lib/common/domain/entities/entity-base";

export interface CreatePaymentMethodRequest extends EntityBase{
    type: string,
    interest: number
}

export interface PaymentMethodEntity extends CreatePaymentMethodRequest {}