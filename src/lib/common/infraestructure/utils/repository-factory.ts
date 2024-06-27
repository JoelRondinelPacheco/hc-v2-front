import { RoleEnum } from "@/domain/auth";
import { Repository } from "../../domain/repository";
import { createCategoryAPIRepository } from "@/lib/category/infrastructure/category-api-repository";
import { createPaymentMethodAPIRepository } from "@/lib/payment-method/infrastructure/payment-method-api-repository";
import { createCategoryMockRepository } from "@/lib/category/infrastructure/category-mock-repository";
import { createPaymentMethodMockRepository } from "@/lib/payment-method/infrastructure/payment-method-mock-repository";
import { CategoryEntity } from "@/lib/category/domain/category.entity";
import { PaymentMethodEntity } from "@/lib/payment-method/domain/payment-method.entity";


//todo refactor move type
type CategoryRepository = {
    category: Repository<CategoryEntity>
}
type PaymentMethodRepository = {
    paymentMethod: Repository<PaymentMethodEntity>
}
export type RepositoryContainer = CategoryRepository & PaymentMethodRepository


//todo white list de roles
//definir interfaz en domain?
export const repositoryFactory = (role: RoleEnum): RepositoryContainer => {
    if (role === "ADMINISTRATOR" || role === "EMPLOYEE" || role === "OWNER") {
        return apiRepositoryContainer;
    } else {
        return mockRepositoryContainer;
    }
}

//todo definir en domain?
const apiRepositoryContainer: RepositoryContainer = {
    category: createCategoryAPIRepository(),
    paymentMethod: createPaymentMethodAPIRepository(),
}

const mockRepositoryContainer: RepositoryContainer = {
    category: createCategoryMockRepository(),
    paymentMethod: createPaymentMethodMockRepository()
}