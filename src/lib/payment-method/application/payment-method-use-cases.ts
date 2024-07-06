import { PersistenceOutPort } from "@/lib/common/application/ports/out/persistence-out-port";
import { CreatePaymentMethodRequest, PaymentMethodEntity, UpdatePaymentMethodRequest } from "../domain/payment-method.entity";
import { InputMapper } from "@/lib/common/adapter/mapper/mapper";
import { createUseCases } from "@/lib/common/application/use-cases/use-cases";
import { PaymentMethodDTO } from "./dto/payment-method.dto";

export const createPaymentMethodUseCases = (
    repository: PersistenceOutPort<PaymentMethodEntity, CreatePaymentMethodRequest, UpdatePaymentMethodRequest>,
    mapper: InputMapper<PaymentMethodDTO,  CreatePaymentMethodRequest, UpdatePaymentMethodRequest> 
    ) => createUseCases(repository, mapper);