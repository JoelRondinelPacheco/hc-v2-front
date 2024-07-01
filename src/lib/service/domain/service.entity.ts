import { CategoryEntity } from "@/lib/category/domain/category.entity"
import { EntityBase } from "@/lib/common/domain/entity-base"

interface ServiceBase {
    name: string,
    description: string,
    price: number,
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

export interface CreateServiceRequest extends ServiceBase {
    categoryId: number,
}

export interface EditServiceRequest extends CreateServiceRequest, CategoryEntity {}