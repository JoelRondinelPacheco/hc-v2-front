import { EntityBase } from "../../common/domain/entity-base";

export interface CategoryEntity extends EntityBase{
    name: string;
    description: string;
}