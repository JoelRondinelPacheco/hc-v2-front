import { PaymentMethodEntity } from "@/domain/payment-method.domain";
import { MockRepositoryImpl } from "./mock-repository-impl";
import paymentMethodMockData from "../../../lib/payment-method/adapter/output/paymenth-method-mock-db";

export class MockPaymentMethodRepository extends MockRepositoryImpl<PaymentMethodEntity> {

    constructor() {
        super(paymentMethodMockData())
    }

}