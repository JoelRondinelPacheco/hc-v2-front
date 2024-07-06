import { apiRepository } from "@/lib/common/adapter/out/http/api-repository";
import { CreatePaymentMethodRequest, PaymentMethodEntity, UpdatePaymentMethodRequest } from "../../domain/payment-method.entity";
import { getPaymentMethodModule } from "@/lib/common/domain/module";

export const createPaymentMethodAPIRepository = () => apiRepository<PaymentMethodEntity, CreatePaymentMethodRequest, UpdatePaymentMethodRequest>(getPaymentMethodModule().basePath);