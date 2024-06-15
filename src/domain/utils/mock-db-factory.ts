import { CategoryEntity } from "../category.domain";
import { EntityBase } from "../commons.domain";
import { categoriesMockData } from "../mock-backend/category/category-mock-db";
import { MockCategoryReposityory } from "../mock-backend/mock-db/mock-category-repository";
import { MockDB } from "../mock-backend/mock-db/mock-db";
import { MockRepository } from "../mock-backend/mock-db/mock-repository";
import paymentMethodMockData from "../mock-backend/payment-method/paymenth-method-mock-db";
import { PaymentMethodEntity } from "../payment-method.domain";

export function mockRepositoryFactory(endpoint: string): MockDB {
    switch (endpoint) {
        case "/category":
            return new MockCategoryReposityory();
        default:
            return new MockCategoryReposityory();
            //TODO RETURN UNDEFINED
    }
}