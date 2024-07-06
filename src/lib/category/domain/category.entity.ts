import { EntityBase } from "../../common/domain/entities/entity-base";

export interface CategoryBase {
    name: string;
    description: string;
}

export interface CreateCategoryRequest extends CategoryBase, EntityBase{}

export interface CreateCategoryRequestB {
    name: string;
    description: string;
}


export interface CategoryEntity extends CreateCategoryRequest{}
export interface UpdateCategoryRequest extends CategoryEntity{}