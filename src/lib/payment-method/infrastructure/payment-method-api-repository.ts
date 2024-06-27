import { apiRepository } from "@/lib/common/infraestructure/api-repository";
import { PaymentMethodEntity } from "../domain/payment-method.entity";

export const createPaymentMethodAPIRepository = () => apiRepository<PaymentMethodEntity>("/payment-method");