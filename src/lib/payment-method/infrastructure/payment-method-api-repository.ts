import { apiRepository } from "@/lib/common/infrastructure/api-repository";
import { PaymentMethodEntity } from "../domain/payment-method.entity";
import { getPaymentMethodModule } from "@/lib/common/domain/module";

export const createPaymentMethodAPIRepository = () => apiRepository<PaymentMethodEntity>(getPaymentMethodModule().basePath);