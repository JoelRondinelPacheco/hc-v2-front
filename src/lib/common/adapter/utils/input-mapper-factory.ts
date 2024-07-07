import { createCategoryInputMapper } from "@/lib/category/adapter/mapper/category-input.mapper"
import { CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest } from "@/lib/category/domain/category.entity"
import { createPaymentMethodInputMapper } from "@/lib/payment-method/adapter/mapper/payment-method-input-mapper"
import { createServiceInputMapper } from "@/lib/service/adapter/mapper/service-input-mapper"
import { InputMapper } from "../mapper/mapper"
import { CategoryDTO } from "@/lib/category/application/dto/category.dto"
import { ServiceDTO } from "@/lib/service/application/dto/service-dto"
import { CreateServiceRequest, UpdateServiceRequest } from "@/lib/service/domain/service.entity"
import { PaymentMethodDTO } from "@/lib/payment-method/application/dto/payment-method.dto"
import { CreatePaymentMethodRequest, UpdatePaymentMethodRequest } from "@/lib/payment-method/domain/payment-method.entity"
import { ClientDTO } from "@/lib/user/application/dto/client-dto"
import { CreateClientRequest, UpdateClientRequest } from "@/lib/user/domain/client.entity"
import { EmployeeDTO } from "@/lib/user/application/dto/employee-dto"
import { CreateEmployeeRequest, UpdateEmployeeRequest } from "@/lib/user/domain/employee.entity"
import { createClientInputMapper } from "@/lib/user/adapter/mapper/client-input-mapper"
import { createEmployeeInputMapper } from "@/lib/user/adapter/mapper/employee-input-mapper"

export type InputMapperCollection = {
    category: InputMapper<CategoryDTO, CreateCategoryRequest, UpdateCategoryRequest>,
    paymentMethod: InputMapper<PaymentMethodDTO, CreatePaymentMethodRequest, UpdatePaymentMethodRequest>
    service: InputMapper<ServiceDTO, CreateServiceRequest, UpdateServiceRequest>,
    client: InputMapper<ClientDTO, CreateClientRequest, UpdateClientRequest>,
    employee: InputMapper<EmployeeDTO, CreateEmployeeRequest, UpdateEmployeeRequest>
}

export const createInputMappers = (): InputMapperCollection => {
    return {
        category: createCategoryInputMapper(),
        paymentMethod: createPaymentMethodInputMapper(),
        service: createServiceInputMapper(),
        client: createClientInputMapper(),
        employee: createEmployeeInputMapper(),

    }
}