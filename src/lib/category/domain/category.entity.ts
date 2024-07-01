import { EntityBase } from "../../common/domain/entity-base";

export interface CreateCategoryRequest {
    name: string;
    description: string;
}

export interface CategoryEntity extends CreateCategoryRequest, EntityBase{}