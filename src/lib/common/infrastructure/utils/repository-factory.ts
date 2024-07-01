import { Repository } from "../../domain/repository";

import { RoleEnum } from "@/domain/auth";

import { CategoryEntity, CreateCategoryRequest } from "@/lib/category/domain/category.entity";
import { CreateServiceRequest, EditServiceRequest, ServiceEntity } from "@/lib/service/domain/service.entity";
import { CreateEmployeeRequest, EditEmployeeRequest, EmployeeEntity } from "@/lib/user/domain/employee.entity";
import { CreatePaymentMethodRequest, EditPaymentMethodRequest, PaymentMethodEntity } from "@/lib/payment-method/domain/payment-method.entity";
import { ClientEntity, EditClientRequest } from "../../../user/domain/client.entity";

import { createCategoryAPIRepository } from "@/lib/category/infrastructure/category-api-repository";
import { createCategoryMockRepository } from "@/lib/category/infrastructure/category-mock-repository";
import { createPaymentMethodMockRepository } from "@/lib/payment-method/infrastructure/payment-method-mock-repository";
import { createServiceMockRepository } from "@/lib/service/infrastructure/service-mock-repository";
import { createServiceAPIRepository } from "@/lib/service/infrastructure/service-api-repository";
import { createPaymentMethodAPIRepository } from "@/lib/payment-method/infrastructure/payment-method-api-repository";
import { createEmployeeMockRepository } from "../../../user/infrastructure/employee-mock-repository";
import { createEmployeeAPIRepository } from "../../../user/infrastructure/employee-api-repository";
import { createClientMockRepository } from "../../../user/infrastructure/client-mock-repository";
import { createClientAPIRepository } from "../../../user/infrastructure/client-api-repository";
import { CreateClientRequest } from "@/domain/client.domain";


/*
export type RepositoryContainer = {
    category: Repository<CategoryEntity, CreateCategoryRequest, CategoryEntity>,
    paymentMethod: Repository<PaymentMethodEntity, CreatePaymentMethodReqyest, PaymentMethodEntity>,
    service: Repository<ServiceEntity, CreateServiceRequest, EditServiceRequest>,
    employee: Repository<EmployeeEntity, CreateEmployeeRequest, EditEmployeeRequest>,
    client: Repository<ClientEntity, CreateClientRequest, EditClientRequest>
}
*/
export type RepositoryContainer = {
    category: Repository<CategoryEntity, CreateCategoryRequest, CategoryEntity>,
    paymentMethod: Repository<PaymentMethodEntity, CreatePaymentMethodRequest, EditPaymentMethodRequest> | Repository<PaymentMethodEntity, PaymentMethodEntity, PaymentMethodEntity>,
    service: Repository<ServiceEntity, CreateServiceRequest , EditServiceRequest> | Repository<ServiceEntity, ServiceEntity, ServiceEntity>,
    employee: Repository<EmployeeEntity, CreateEmployeeRequest, EditEmployeeRequest> | Repository<EmployeeEntity, EmployeeEntity, EmployeeEntity>,
    client: Repository<ClientEntity, CreateClientRequest, EditClientRequest> | Repository<ClientEntity, ClientEntity, ClientEntity>
}
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
    service: createServiceAPIRepository(),
    employee: createEmployeeAPIRepository(),
    client: createClientAPIRepository()

}

const mockRepositoryContainer: RepositoryContainer = {
    category: createCategoryMockRepository(),
    paymentMethod: createPaymentMethodMockRepository(),
    service: createServiceMockRepository(),
    employee: createEmployeeMockRepository(),
    client: createClientMockRepository()
}