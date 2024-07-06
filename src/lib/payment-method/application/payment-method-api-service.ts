import { Service } from "@/lib/common/domain/service";
import { CreatePaymentMethodRequest, EditPaymentMethodRequest, PaymentMethodEntity } from "../domain/payment-method.entity";
import { createAPIUseCases } from "@/lib/common/application/service";

export const createPaymentMethodAPIService: Service<PaymentMethodEntity, CreatePaymentMethodRequest, EditPaymentMethodRequest> = (repository) => createAPIUseCases(repository);