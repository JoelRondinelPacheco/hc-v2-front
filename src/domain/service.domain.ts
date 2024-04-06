import { CategoryEntity } from "./category.domain"
import { EntityBase } from "./commons.domain"

type ServiceBase = {
    name: string,
    description: string,
    price: number,
}

export type EditService = ServiceBase & {
    id: number
}

export type NewServiceDTO = ServiceBase & {
    categoryId: number
}

export type ServiceEntity = EntityBase & ServiceBase & {
    createdAt: string,
    updatedAt: string,
    category: CategoryEntity
}