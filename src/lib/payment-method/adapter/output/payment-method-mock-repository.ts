import { CreatePaymentMethodRequest, PaymentMethodEntity, UpdatePaymentMethodRequest } from "../../domain/payment-method.entity";
import { OutputMapper } from "@/lib/common/adapter/mapper/mapper";
import { mockRepository } from "@/lib/common/adapter/out/mock-db/mock-repository";


export const createPaymentMethodMockRepository = (data: PaymentMethodEntity[], mapper: OutputMapper<PaymentMethodEntity, CreatePaymentMethodRequest, UpdatePaymentMethodRequest>) => mockRepository(data, mapper);