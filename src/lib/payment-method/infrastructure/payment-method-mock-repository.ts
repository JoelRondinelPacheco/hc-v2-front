import { Repository } from "@/lib/common/domain/repository";
import { mockRepository } from "@/lib/common/infraestructure/mock-repository";
import paymentMethodMockData from "@/domain/mock-backend/mock-database/paymenth-method-mock-db";

const createPaymentMethodMockRepository = mockRepository(paymentMethodMockData());