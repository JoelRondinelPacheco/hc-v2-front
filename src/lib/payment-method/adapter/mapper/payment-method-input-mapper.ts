import { InputMapper } from "@/lib/common/adapter/mapper/mapper"
import { PaymentMethodDTO } from "../../application/dto/payment-method.dto"
import { CreatePaymentMethodRequest, UpdatePaymentMethodRequest } from "../../domain/payment-method.entity"


export const createPaymentMethodInputMapper = (): InputMapper<PaymentMethodDTO, CreatePaymentMethodRequest, UpdatePaymentMethodRequest> => {
    return {
        driverDTOtoSave: paymentMethodDTOToSave,
        driverDTOtoUpdate: paymentMethodDTOToUpdate
    }
}

export const paymentMethodDTOToSave = (dto: PaymentMethodDTO): CreatePaymentMethodRequest => {
    return {
        interest: dto.interest,
        type: dto.type
    }
}

export const paymentMethodDTOToUpdate = (dto: PaymentMethodDTO): UpdatePaymentMethodRequest => {
    return {
        id: dto.id,
        interest: dto.interest,
        type: dto.type
    }
}