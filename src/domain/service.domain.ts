import { CategoryEntity } from "./category.domain"

export type ServiceEntity = {
    id: number,
    price: number | string,
    code: string,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    category: CategoryEntity
}