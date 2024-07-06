import { EntityBase } from "@/lib/common/domain/entities/entity-base";

export interface PaymentMethodBase {
    type: string,
    interest: number
}

export interface CreatePaymentMethodRequest extends PaymentMethodBase {}

export interface PaymentMethodEntity extends PaymentMethodBase, EntityBase {}

export interface UpdatePaymentMethodRequest extends PaymentMethodEntity {}