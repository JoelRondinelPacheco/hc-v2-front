import { Repository } from "../../domain/repository";

import { RoleEnum } from "@/domain/auth";

import { CategoryEntity, CreateCategoryRequest } from "@/lib/category/domain/category.entity";
import { CreateServiceRequest, ServiceEntity } from "@/lib/service/domain/service.entity";
import { CreateEmployeeRequest, EmployeeEntity } from "@/lib/user/domain/employee.entity";
import { CreatePaymentMethodRequest, PaymentMethodEntity } from "@/lib/payment-method/domain/payment-method.entity";
import { ClientEntity, CreateClientRequest } from "../../../user/domain/client.entity";

import { createCategoryAPIRepository } from "@/lib/category/adapter/output/category-api-repository";
import { createCategoryMockRepository } from "@/lib/category/adapter/category-mock-repository";
import { createPaymentMethodMockRepository } from "@/lib/payment-method/adapter/output/payment-method-mock-repository";
import { createServiceMockRepository } from "@/lib/service/adapter/output/service-mock-repository";
import { createServiceAPIRepository } from "@/lib/service/adapter/output/service-api-repository";
import { createPaymentMethodAPIRepository } from "@/lib/payment-method/adapter/output/payment-method-api-repository";
import { createEmployeeMockRepository } from "../../../user/adapter/output/employee-mock-repository";
import { createEmployeeAPIRepository } from "../../../user/adapter/output/employee-api-repository";
import { createClientMockRepository } from "../../../user/adapter/output/client-mock-repository";
import { createClientAPIRepository } from "../../../user/adapter/client-api-repository";
import { categoriesMockData } from "@/lib/category/adapter/output/category-mock-db";
import paymentMethodMockData from "@/lib/payment-method/adapter/paymenth-method-mock-db";
import servicesMockData from "@/lib/service/adapter/output/service-mock-db";
import employeesMockData from "@/lib/user/adapter/output/employee-mock-db";
import clientsMockData from "@/lib/user/adapter/output/clients-mock-db";



export type RepositoryContainer = {
    category: Repository<CategoryEntity, CreateCategoryRequest>,
    paymentMethod: Repository<PaymentMethodEntity, CreatePaymentMethodRequest>,
    service: Repository<ServiceEntity, CreateServiceRequest>,
    employee: Repository<EmployeeEntity, CreateEmployeeRequest>,
    client: Repository<ClientEntity, CreateClientRequest>
}

/*
export type RepositoryContainer = {
    category: Repository<CategoryEntity, CreateCategoryRequest, CategoryEntity>,
    paymentMethod: Repository<PaymentMethodEntity, CreatePaymentMethodRequest, EditPaymentMethodRequest> | Repository<PaymentMethodEntity, PaymentMethodEntity, PaymentMethodEntity>,
    service: Repository<ServiceEntity, CreateServiceRequest , EditServiceRequest> | Repository<ServiceEntity, ServiceEntity, ServiceEntity>,
    employee: Repository<EmployeeEntity, CreateEmployeeRequest, EditEmployeeRequest> | Repository<EmployeeEntity, EmployeeEntity, EmployeeEntity>,
    client: Repository<ClientEntity, CreateClientRequest, EditClientRequest> | Repository<ClientEntity, ClientEntity, ClientEntity>
}
*/
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
    category: createCategoryMockRepository(categoriesMockData()),
    paymentMethod: createPaymentMethodMockRepository(paymentMethodMockData()),
    service: createServiceMockRepository(servicesMockData()),
    employee: createEmployeeMockRepository(employeesMockData()),
    client: createClientMockRepository(clientsMockData())
}