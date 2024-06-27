export interface Module {
    name: ModuleEnum,
    basePath: string
}

type ModuleEnum = "CATEGORY" | "PAYMENT_METHOD" | "CLIENT" | "EMPLOYEE" | "ADMIN"
const categoryModule: Module = {
    name: "CATEGORY",
    basePath: "/category"
}
const paymentMethodModule: Module = {
    name: "PAYMENT_METHOD",
    basePath: "/payment-method"
}
const modules: Module[] = [
    {
        name: "CLIENT",
        basePath: "/client"
    },
    {
        name: "EMPLOYEE",
        basePath: "/employee"
    },
    {
        name: "ADMIN",
        basePath: "/admin"
    }
]

export function getCategoryModule(): Module {
    return {...categoryModule};
}
export function getPaymentMethodModue(): Module {
    return {...paymentMethodModule}
}