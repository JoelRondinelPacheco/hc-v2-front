import { MockCategoryReposityory } from "../mock-backend/mock-repository/mock-category-repository";
import { MockRepository } from "../mock-backend/mock-repository/mock-repository";
import { MockPaymentMethodRepository } from "../mock-backend/mock-repository/mock-payment-method-repository";

export function mockRepositoryFactory(endpoint: string): MockRepository {
    switch (endpoint) {
        case "/category":
            return new MockCategoryReposityory();
        case "/payment-method":
            return new MockPaymentMethodRepository();
        default:
            return new MockCategoryReposityory();
            //TODO RETURN UNDEFINED
    }
}