import { mockRepository } from "@/lib/common/infraestructure/mock-repository";
import paymentMethodMockData from "@/domain/mock-backend/mock-database/paymenth-method-mock-db";

export const createPaymentMethodMockRepository = () => mockRepository(paymentMethodMockData());