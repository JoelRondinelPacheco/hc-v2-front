import { Service, ServicesActions } from "../../domain/service";

import { Repository } from "../../domain/repository";

export const createService: Service = <T, TUpdateDTO>(repository: Repository<T, TUpdateDTO>): ServicesActions<T, TUpdateDTO> => {
    return {
        getAll() {
            return repository.getAll();
        },
        getPage(pageable) {
            return repository.getPage(pageable);
        },
        getById(id) {
            return repository.getById(String(id));
        },
        save(entity) {
            return repository.save(entity);
        },
        update(entity, id) {
            return repository.update(entity, String(id));
        },
        delete(id) {
            return repository.delete(id);
        }
    }
}

/*
export type ServicesContainer = {
    category: Service<CategoryEntity, CreateCategoryRequest, CategoryEntity> | Service<CategoryEntity, CreateCategoryRequest, CategoryEntity, CategoryEntity, CategoryEntity>,
    paymentMethod: Service<PaymentMethodEntity, CreatePaymentMethodRequest, EditPaymentMethodRequest> | Service<PaymentMethodEntity, CreateCategoryRequest, PaymentMethodEntity, PaymentMethodEntity, PaymentMethodEntity>,
    service: Service<ServiceEntity, CreateServiceRequest, EditServiceRequest> | Service<ServiceEntity, CreateServiceRequest, EditServiceRequest, ServiceEntity, ServiceEntity>,
    employee: Service<EmployeeEntity, CreateEmployeeRequest, EditEmployeeRequest> | Service<EmployeeEntity, CreateEmployeeRequest, EditEmployeeRequest, EmployeeEntity, EmployeeEntity>,
    client: Service<ClientEntity, CreateClientRequest, EditClientRequest> | Service<ClientEntity, CreateClientRequest, EditClientRequest, ClientEntity, ClientEntity>,
}
*/
/*
export const servicesFactory = (role: RoleEnum): ServicesContainer => {
    if (role === "ADMINISTRATOR" || role === "EMPLOYEE" || role === "OWNER") {
        return apiServiceContainer;
    } else {
        return mockServiceContainer;
    }
}*/
/*

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
}*/