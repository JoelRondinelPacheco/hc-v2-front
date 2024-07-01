import { EntityBase } from "../../common/domain/entity-base";

export interface CreateCategoryRequest extends EntityBase{
    name: string;
    description: string;
}

export interface CategoryEntity extends CreateCategoryRequest{}