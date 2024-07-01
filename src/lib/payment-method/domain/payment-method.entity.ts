import { EntityBase } from "@/lib/common/domain/entity-base";

export interface CreatePaymentMethodRequest {
    type: string,
    interest: number
}

export interface PaymentMethodEntity extends CreatePaymentMethodRequest, EntityBase {}
export interface EditPaymentMethodRequest extends PaymentMethodEntity {}