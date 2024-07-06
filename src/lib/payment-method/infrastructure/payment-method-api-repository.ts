import { apiRepository } from "@/lib/common/adapter/api-repository";
import { CreatePaymentMethodRequest, PaymentMethodEntity } from "../domain/payment-method.entity";
import { getPaymentMethodModule } from "@/lib/common/domain/module";

export const createPaymentMethodAPIRepository = () => apiRepository<PaymentMethodEntity, CreatePaymentMethodRequest>(getPaymentMethodModule().basePath);