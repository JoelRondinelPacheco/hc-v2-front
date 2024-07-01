import { Service } from "@/lib/common/domain/service";
import { CreatePaymentMethodRequest, EditPaymentMethodRequest, PaymentMethodEntity } from "../domain/payment-method.entity";
/*
export const createPaymentMethodMockService: Service<PaymentMethodEntity, CreatePaymentMethodRequest, EditPaymentMethodRequest, PaymentMethodEntity, PaymentMethodEntity> = (repository) => {
    return {
        getAll: () => {
            return repository.getAll()
        },
        getPage: (pageable) => repository.getPage(pageable),
        getById: (id) => repository.getById(String(id)),
        save: (paymentMethod) => {
            const {type, interest} = paymentMethod;
            let paymentMethodEntity: PaymentMethodEntity = {
                id: 0,
                type: type,
                interest: interest
            }
            return repository.save(paymentMethodEntity);
        },
        update: (entity, idC) => {
            const { id, type, interest } = entity;
            let paymentMethodEntity: PaymentMethodEntity = {
                id: 0,
                type: type,
                interest: interest
            }
            return repository.update(paymentMethodEntity, idC);
        },
        delete: (id) => repository.delete(id)
    }
}*/