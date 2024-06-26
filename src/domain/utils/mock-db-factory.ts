import { MockCategoryReposityory } from "../mock-backend/mock-repository/mock-category-repository";
import { MockRepository } from "../mock-backend/mock-repository/mock-repository";
import { MockPaymentMethodRepository } from "../mock-backend/mock-repository/mock-payment-method-repository";
import { ClientsMockRepository } from "../mock-backend/mock-repository/clients-mock-repository";
import { ServicesMockRepository } from "../mock-backend/mock-repository/services-mock-repository";
import { SaleMockRepository } from "../mock-backend/mock-repository/sale-mock-repository";
import { EmployeeMockRepository } from "../mock-backend/mock-repository/employees-mock-repository";

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
        case "/sale":
            return new SaleMockRepository();
        case "/employee":
            return new EmployeeMockRepository();
        default:
            return new MockCategoryReposityory();
    }
}