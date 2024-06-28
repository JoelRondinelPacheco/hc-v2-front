import { mockRepository } from "@/lib/common/infrastructure/mock-repository";
import paymentMethodMockData from "@/lib/payment-method/infrastructure/paymenth-method-mock-db";

export const createPaymentMethodMockRepository = () => mockRepository(paymentMethodMockData());