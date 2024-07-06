import { EntityBase } from "../../common/domain/entities/entity-base";

export interface CategoryBase {
    name: string;
    description: string;
}

export interface CreateCategoryRequest extends CategoryBase {}

export interface CategoryEntity extends CategoryBase, EntityBase{}

export interface UpdateCategoryRequest extends CategoryEntity{}