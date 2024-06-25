import { EntityBase } from "@/domain/commons.domain";

export interface CategoryEntity extends EntityBase{
    name: string;
    description: string;
}

