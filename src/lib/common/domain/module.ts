export interface Module {
    name: ModuleEnum,
    basePath: string
}

type ModuleEnum = "CATEGORY" | "PAYMENT_METHOD" | "SERVICE" | "CLIENT" | "EMPLOYEE" | "ADMIN" | "SALE";
const categoryModule: Module = {
    name: "CATEGORY",
    basePath: "/category"
}
const paymentMethodModule: Module = {
    name: "PAYMENT_METHOD",
    basePath: "/payment-method"
}
const serviceModule: Module = {
    name: "SERVICE",
    basePath: "/service"
}

const clientModule: Module = {
    name: "CLIENT",
    basePath: "/client"
}
const employeeModule: Module = {
    name: "EMPLOYEE",
    basePath: "/employee"
}
const adminModule: Module = {
    name: "ADMIN",
    basePath: "/admin"
}

const saleModule: Module = {
    name: "SALE",
    basePath: "/sale"
}


export function getCategoryModule(): Module {
    return {...categoryModule};
}
export function getPaymentMethodModule(): Module {
    return {...paymentMethodModule};
}

export function getServiceModule(): Module {
    return {...serviceModule};
}
export function getClientModule(): Module {
    return {...clientModule};
}
export function getEmployeeModule(): Module {
    return {...employeeModule};
}
export function getAdminModule(): Module {
    return {...adminModule};
}
export function getSaleModule(): Module {
    return {...saleModule};
}