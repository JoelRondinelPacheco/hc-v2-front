import { MockCategoryReposityory } from "../mock-backend/mock-repository/mock-category-repository";
import { MockRepository } from "../mock-backend/mock-repository/mock-repository";
import { MockPaymentMethodRepository } from "../mock-backend/mock-repository/mock-payment-method-repository";
import { ClientsMockRepository } from "../mock-backend/mock-repository/clients-mock-repository";
import { ServicesMockRepository } from "../mock-backend/mock-repository/services-mock-repository";

export function mockRepositoryFactory(endpoint: string): MockRepository {
    switch (endpoint) {
        case "/category":
            return new MockCategoryReposityory();
        case "/payment-method":
            return new MockPaymentMethodRepository();
        case "/client":
            return new ClientsMockRepository();
        case "/service":
            return new ServicesMockRepository();
        default:
            return new MockCategoryReposityory();
    }
}