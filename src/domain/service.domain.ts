import { CategoryEntity } from "./category.domain"

type ServiceBase = {
    code: string,
    name: string,
    description: string,
    price: number | string,
}

export type NewServiceDTO = ServiceBase & {
    categoryId: number
}

export type ServiceEntity =  ServiceBase & {
    id: number,
    createdAt: string,
    updatedAt: string,
    category: CategoryEntity
}