import { RoleEnum } from "@/domain/auth";
import { createCategoryAPIService } from "@/lib/category/application/category-api-service";
import { createCategoryMockService } from "@/lib/category/application/category-mock-service";
import { CategoryEntity, CreateCategoryRequest } from "@/lib/category/domain/category.entity";
import { Service } from "../../domain/service";
import { PaymentMethodEntity } from "@/domain/payment-method.domain";
import { CreatePaymentMethodRequest, EditPaymentMethodRequest } from "@/lib/payment-method/domain/payment-method.entity";
import { createPaymentMethodAPIService } from "@/lib/payment-method/application/payment-method-api-service";
import { createPaymentMethodMockService } from "@/lib/payment-method/application/payment-method-mock-service";
import { CreateServiceRequest, EditServiceRequest, ServiceEntity } from "@/lib/service/domain/service.entity";
import { ClientEntity, CreateClientRequest, EmployeeEntity } from "@/domain/client.domain";
import { CreateEmployeeRequest, EditEmployeeRequest } from "@/lib/user/domain/employee.entity";
import { EditClientRequest } from "@/lib/user/domain/client.entity";
import { createServiceMockService } from "@/lib/service/application/service-mock-service";
import { createServiceAPIService } from "@/lib/service/application/service-api-service";
import { createEmployeeAPIService } from "@/lib/user/application/employee-api-service";
import { createClientAPIService } from "@/lib/user/application/client-api-service";
import { createEmployeeMockService } from "@/lib/user/application/employee-mock-service";

export type ServicesContainer = {
    category: Service<CategoryEntity, CreateCategoryRequest, CategoryEntity> | Service<CategoryEntity, CreateCategoryRequest, CategoryEntity, CategoryEntity, CategoryEntity>,
    paymentMethod: Service<PaymentMethodEntity, CreatePaymentMethodRequest, EditPaymentMethodRequest> | Service<PaymentMethodEntity, CreateCategoryRequest, PaymentMethodEntity, PaymentMethodEntity, PaymentMethodEntity>,
    service: Service<ServiceEntity, CreateServiceRequest, EditServiceRequest> | Service<ServiceEntity, CreateServiceRequest, EditServiceRequest, ServiceEntity, ServiceEntity>,
    employee: Service<EmployeeEntity, CreateEmployeeRequest, EditEmployeeRequest> | Service<EmployeeEntity, CreateEmployeeRequest, EditEmployeeRequest, EmployeeEntity, EmployeeEntity>,
    client: Service<ClientEntity, CreateClientRequest, EditClientRequest> | Service<ClientEntity, CreateClientRequest, EditClientRequest, ClientEntity, ClientEntity>,
}

export const servicesFactory = (role: RoleEnum): ServicesContainer => {
    if (role === "ADMINISTRATOR" || role === "EMPLOYEE" || role === "OWNER") {
        return apiServiceContainer;
    } else {
        return mockServiceContainer;
    }
}

const apiServiceContainer: ServicesContainer = {
    category: createCategoryAPIService,
    paymentMethod: createPaymentMethodAPIService,
    service: createServiceAPIService,
    employee: createEmployeeAPIService,
    client: createClientAPIService
}

const mockServiceContainer: ServicesContainer = {
    category: createCategoryMockService,
    paymentMethod: createPaymentMethodMockService,
    service: createServiceMockService,
    employee: createEmployeeMockService,
    client: createClientAPIService
}