import { CategoryEntity } from "@/lib/category/domain/category.entity"
import { EntityBase } from "@/lib/common/domain/entity-base"

interface ServiceBase {
    name: string,
    description: string,
    price: number,
}

export type EditService = ServiceBase & EntityBase

export interface NewServiceDTO extends ServiceBase {
    categoryId: number
}

export interface ServiceEntity extends EntityBase, ServiceBase {
    createdAt: Date,
    updatedAt: Date,
    category: CategoryEntity
}

export type ServiceEntityDB = EntityBase & ServiceBase & {
    createAt: string,
    updatedAt: string,
    fk_category: number,
}