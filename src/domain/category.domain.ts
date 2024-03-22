import { EntityBase } from "./commons.domain"

export type CategoryEntity = EntityBase & {
    name: string,
    description: string,
}