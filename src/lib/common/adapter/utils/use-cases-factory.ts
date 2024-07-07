import { ServiceDTO } from "@/lib/service/application/dto/service-dto"
import { useCases } from "../../application/ports/in/use-cases-input-port"
import { CreateServiceRequest, ServiceEntity, UpdateServiceRequest } from "@/lib/service/domain/service.entity"
import { createCategoryUseCases } from "@/lib/category/application/use-cases/category-use-cases"
import { PersistenceOutPort } from "../../application/ports/out/persistence-out-port"
import { CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest } from "@/lib/category/domain/category.entity"
import { createCategoryInputMapper } from "@/lib/category/adapter/mapper/category-input.mapper"
import { CategoryDTO } from "@/lib/category/application/dto/category.dto"
import { CreatePaymentMethodRequest, PaymentMethodEntity, UpdatePaymentMethodRequest } from "@/lib/payment-method/domain/payment-method.entity"
import { PaymentMethodDTO } from "@/lib/payment-method/application/dto/payment-method.dto"
import { createPaymentMethodInputMapper } from "@/lib/payment-method/adapter/mapper/payment-method-input-mapper"
import { createPaymentMethodUseCases } from "@/lib/payment-method/application/payment-method-use-cases"
import { ClientEntity, CreateClientRequest, UpdateClientRequest } from "@/lib/user/domain/client.entity"
import { ClientDTO } from "@/lib/user/application/dto/client-dto"
import { CreateEmployeeRequest, EmployeeEntity, UpdateEmployeeRequest } from "@/lib/user/domain/employee.entity"
import { EmployeeDTO } from "@/lib/user/application/dto/employee-dto"
import { createServiceUseCases } from "@/lib/service/application/service-use-cases"
import { createServiceInputMapper } from "@/lib/service/adapter/mapper/service-input-mapper"
import { createClientUseCases } from "@/lib/user/application/client-use-cases"
import { createClientInputMapper } from "@/lib/user/adapter/mapper/client-input-mapper"
import { createEmployeeUseCases } from "@/lib/user/application/employee-use-cases"
import { createEmployeeInputMapper } from "@/lib/user/adapter/mapper/employee-input-mapper"
import { EntityBase } from "../../domain/entities/entity-base"

export type ServiceFactory<T extends EntityBase, TSave, TEdit, TDriverDTO extends EntityBase> = (repository: PersistenceOutPort<T, TSave, TEdit>) => useCases<TDriverDTO, T>

export type ServicesCollection = {
    category: ServiceFactory<CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest, CategoryDTO>,
    paymentMethod: ServiceFactory<PaymentMethodEntity, CreatePaymentMethodRequest, UpdatePaymentMethodRequest, PaymentMethodDTO>,
    service: ServiceFactory<ServiceEntity, CreateServiceRequest, UpdateServiceRequest, ServiceDTO>,
    client: ServiceFactory<ClientEntity, CreateClientRequest, UpdateClientRequest, ClientDTO>,
    employee: ServiceFactory<EmployeeEntity, CreateEmployeeRequest, UpdateEmployeeRequest, EmployeeDTO>,
    
}

export const useCasesFactory = (): ServicesCollection => {
    return {
        category: (repository: PersistenceOutPort<CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest>) => createCategoryUseCases(repository, createCategoryInputMapper()),
        paymentMethod: (repository: PersistenceOutPort<PaymentMethodEntity, CreatePaymentMethodRequest, UpdatePaymentMethodRequest>) => createPaymentMethodUseCases(repository, createPaymentMethodInputMapper()),
        service: (repository: PersistenceOutPort<ServiceEntity, CreateServiceRequest, UpdateServiceRequest>) => createServiceUseCases(repository, createServiceInputMapper()),
        client: (repository: PersistenceOutPort<ClientEntity, CreateClientRequest, UpdateClientRequest>) => createClientUseCases(repository, createClientInputMapper()),
        employee: (repository: PersistenceOutPort<EmployeeEntity, CreateEmployeeRequest, UpdateEmployeeRequest>) => createEmployeeUseCases(repository, createEmployeeInputMapper())
    }
}