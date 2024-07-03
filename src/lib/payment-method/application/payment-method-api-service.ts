import { Service } from "@/lib/common/domain/service";
import { CreatePaymentMethodRequest, EditPaymentMethodRequest, PaymentMethodEntity } from "../domain/payment-method.entity";
import { createAPIService } from "@/lib/common/application/service";

export const createPaymentMethodAPIService: Service<PaymentMethodEntity, CreatePaymentMethodRequest, EditPaymentMethodRequest> = (repository) => createAPIService(repository);