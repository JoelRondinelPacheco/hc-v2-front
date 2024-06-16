import { CategoryEntity } from "./category.domain"
import { EntityBase } from "./commons.domain"

type ServiceBase = {
    name: string,
    description: string,
    price: number,
}

export type EditService = ServiceBase & EntityBase

export type NewServiceDTO = ServiceBase & {
    categoryId: number
}

export type ServiceEntity = EntityBase & ServiceBase & {
    createdAt: Date,
    updatedAt: Date,
    category: CategoryEntity
}

export type ServiceEntityDB = EntityBase & ServiceBase & {
    createAt: string,
    updatedAt: string,
    fk_category: number,
}