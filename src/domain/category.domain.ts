import { EntityBase } from "./commons.domain"



export type CategoryBase = {
    name: string,
    description: string,
}

export type CategoryEntity = EntityBase & CategoryBase

export type EditCategory = CategoryEntity