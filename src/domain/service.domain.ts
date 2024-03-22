import { CategoryEntity } from "./category.domain"
import { EntityBase } from "./commons.domain"

type ServiceBase = {
    code: string,
    name: string,
    description: string,
    price: number | string,
}

export type NewServiceDTO = ServiceBase & {
    categoryId: number
}

export type ServiceEntity = EntityBase & ServiceBase & {
    createdAt: string,
    updatedAt: string,
    category: CategoryEntity
}