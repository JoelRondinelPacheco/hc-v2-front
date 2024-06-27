import { apiRepository } from "@/lib/common/infraestructure/api-repository";
import { PaymentMethodEntity } from "../domain/payment-method.entity";
import { getPaymentMethodModue } from "@/lib/common/domain/module";

export const createPaymentMethodAPIRepository = () => apiRepository<PaymentMethodEntity>(getPaymentMethodModue().basePath);