import { createCategoryUseCases } from "@/lib/category/application/use-cases/category-use-cases"
import { createPaymentMethodUseCases } from "@/lib/payment-method/application/payment-method-use-cases"
import { createServiceUseCases } from "@/lib/service/application/service-use-cases"
import { createClientUseCases } from "@/lib/user/application/client-use-cases"
import { createEmployeeUseCases } from "@/lib/user/application/employee-use-cases"


//todo types
export const createAllUseCases = () => {
    return {
        categoryUseCases: createCategoryUseCases,
        paymentMethodUseCases: createPaymentMethodUseCases,
        servicesUseCases: createServiceUseCases,
        clientsUseCases: createClientUseCases,
        employeeUseCases: createEmployeeUseCases,
    }
}