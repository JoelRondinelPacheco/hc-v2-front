import { CreatePaymentMethodRequest, PaymentMethodEntity } from "../domain/payment-method.entity";
import { Repository } from "@/lib/common/domain/repository";
import { getController } from "@/lib/common/application/controller";
import { mockPromise } from "@/lib/common/domain/mock-promise";
import { getPage } from "@/lib/common/domain/pagination";


export const createPaymentMethodMockRepository = (data: PaymentMethodEntity[]): Repository<PaymentMethodEntity, CreatePaymentMethodRequest> => {
    return {
        getAll() {
            const controller = getController();
                       
            const request = mockPromise(data, controller);
            return {
                request,
                controller
            }
        },
        getPage(pageable) {
            const page = getPage(pageable, data);

            const controller = getController();
            const request = mockPromise(page, controller);
            
            return { request, controller}
        },
        getById: (id) => {
            const controller = getController();

            const entityIndex = data.findIndex((c) => c.id === Number(id));
            let response;
            if (entityIndex !== -1) {
                response = data[entityIndex];
            } else {
                response = data[data.length - 1];
            }

            const request = mockPromise(response, controller);
            return { request, controller }
        },
        save: (entityDTO) => {
            const controller = getController();
            const {type, interest} = entityDTO;
            let paymentMethodEntity: PaymentMethodEntity = {
                id: data.length + 1,
                type: type,
                interest: interest
            }
            data.push(paymentMethodEntity);
            
            const request = mockPromise(paymentMethodEntity, controller);

            return { request, controller };
        },
        update: (entity, idC) => {
            
            const controller = getController();
            const { id, type, interest} = entity;
            let paymentMethodEntity: PaymentMethodEntity = {
                id: id,
                type: type,
                interest: interest
            }
            const entityIndex = data.findIndex((c) => c.id === Number(id));
            let response;
            if (entityIndex !== -1) {
                data[entityIndex] = paymentMethodEntity;
                response = data[entityIndex]
            } else {
                //todo error
                data.push(paymentMethodEntity)
            }
            const request = mockPromise(paymentMethodEntity, controller);

            return { request, controller};
        },
        delete(id) {
            const entityIndex = data.findIndex((c) => c.id === Number(id));
            //todo complete
        },
    }

}