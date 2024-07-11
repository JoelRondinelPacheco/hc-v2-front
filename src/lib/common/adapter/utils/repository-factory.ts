import { RoleEnum } from "@/lib/common/domain/entities/auth";
import { PersistenceOutPort } from "../../application/ports/out/persistence-out-port";
import { CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest } from "@/lib/category/domain/category.entity";
import { createCategoryAPIRepository } from "@/lib/category/adapter/output/category-api-repository";
import { createCategoryMockRepository } from "@/lib/category/adapter/output/category-mock-repository";
import { categoriesMockData } from "@/lib/category/adapter/output/category-mock-db";
import { createCategoryOutputMapper } from "@/lib/category/adapter/mapper/category-output.mapper";
import { CreatePaymentMethodRequest, PaymentMethodEntity, UpdatePaymentMethodRequest } from "@/lib/payment-method/domain/payment-method.entity";
import { CreateServiceRequest, ServiceEntity, UpdateServiceRequest } from "@/lib/service/domain/service.entity";
import { ClientEntity, CreateClientRequest, UpdateClientRequest } from "@/lib/user/domain/client.entity";
import { CreateEmployeeRequest, EmployeeEntity, UpdateEmployeeRequest } from "@/lib/user/domain/employee.entity";
import { createPaymentMethodAPIRepository } from "@/lib/payment-method/adapter/output/payment-method-api-repository";
import { createServiceAPIRepository } from "@/lib/service/adapter/output/service-api-repository";
import { createClientAPIRepository } from "@/lib/user/adapter/output/client-api-repository";
import { createEmployeeAPIRepository } from "@/lib/user/adapter/output/employee-api-repository";
import { createPaymentMethodMockRepository } from "@/lib/payment-method/adapter/output/payment-method-mock-repository";
import paymentMethodMockData from "@/lib/payment-method/adapter/output/paymenth-method-mock-db";
import { createPaymentMethodOutputMapper } from "@/lib/payment-method/adapter/mapper/payment-method-outup-mapper";
import { createServiceMockRepository } from "@/lib/service/adapter/output/service-mock-repository";
import servicesMockData from "@/lib/service/adapter/output/service-mock-db";
import { createClientMockRepository } from "@/lib/user/adapter/output/client-mock-repository";
import clientsMockData from "@/lib/user/adapter/output/clients-mock-db";
import { createClientOutputMapper } from "@/lib/user/adapter/mapper/client-output-mapper";
import { createEmployeeMockRepository } from "@/lib/user/adapter/output/employee-mock-repository";
import employeesMockData from "@/lib/user/adapter/output/employee-mock-db";
import { createEmployeeOutputMapper } from "@/lib/user/adapter/mapper/employee-output-mapper";
import { createServiceOutputMapper } from "@/lib/service/adapter/mapper/service-output-mapper";
import { CreateSaleRequest, SaleEntity, UpdateSaleRequest } from "@/lib/sales/domain/sale.domain";
import { createSaleAPIRepository } from "@/lib/sales/adapter/output/createSaleAPIRepository";
import { createSaleMockRepository } from "@/lib/sales/adapter/output/createSaleMockRepository";
import salesMockData from "@/lib/sales/adapter/output/sales-mock-db";
import { createSaleOutputMapper } from "@/lib/sales/adapter/mapper/sale-output-mapper";
import { AxiosInstance } from "axios";




export type RepositoryContainer = {
    category: PersistenceOutPort<CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest>,
    paymentMethod: PersistenceOutPort<PaymentMethodEntity, CreatePaymentMethodRequest, UpdatePaymentMethodRequest>,
    service: PersistenceOutPort<ServiceEntity, CreateServiceRequest, UpdateServiceRequest>,
    client: PersistenceOutPort<ClientEntity, CreateClientRequest, UpdateClientRequest>,
    employee: PersistenceOutPort<EmployeeEntity, CreateEmployeeRequest, UpdateEmployeeRequest>,
    sale: PersistenceOutPort<SaleEntity, CreateSaleRequest, UpdateSaleRequest>
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
    client: createClientAPIRepository(),
    employee: createEmployeeAPIRepository(),
    sale: createSaleAPIRepository(),
}

const mockRepositoryContainer: RepositoryContainer = {
    category: createCategoryMockRepository(categoriesMockData(), createCategoryOutputMapper()),
    paymentMethod: createPaymentMethodMockRepository(paymentMethodMockData(), createPaymentMethodOutputMapper()),
    service: createServiceMockRepository(servicesMockData(), createServiceOutputMapper()),
    client: createClientMockRepository(clientsMockData(), createClientOutputMapper()),
    employee: createEmployeeMockRepository(employeesMockData(), createEmployeeOutputMapper()),
    sale: createSaleMockRepository(salesMockData(), createSaleOutputMapper())

    /*
    paymentMethod: createPaymentMethodMockRepository(paymentMethodMockData()),
    service: createServiceMockRepository(servicesMockData()),
    employee: createEmployeeMockRepository(employeesMockData()),
    client: createClientMockRepository(clientsMockData())*/
}