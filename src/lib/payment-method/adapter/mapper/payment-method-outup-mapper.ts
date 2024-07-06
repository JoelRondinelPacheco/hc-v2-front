import { OutputMapper } from "@/lib/common/adapter/mapper/mapper";
import { CreatePaymentMethodRequest, PaymentMethodEntity, UpdatePaymentMethodRequest } from "../../domain/payment-method.entity";

export const createPaymentMethodOutputMapper = (): OutputMapper<PaymentMethodEntity, CreatePaymentMethodRequest, UpdatePaymentMethodRequest> => {
    return {
        saveToEntity,
        updateToEntity
    }
}

export const saveToEntity = (dto: CreatePaymentMethodRequest, id: number): PaymentMethodEntity => {
    return {
        id: id,
        type: dto.type,
        interest: dto.interest
    }
}

export const updateToEntity = (dto: UpdatePaymentMethodRequest): PaymentMethodEntity => {
    return {
        id: dto.id,
        type: dto.type,
        interest: dto.interest
    }
}