import { OutputMapper } from "@/lib/common/adapter/mapper/mapper";
import { CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest } from "../../domain/category.entity";

export const createCategoryOutputMapper = (): OutputMapper<CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest> => {
    return {
        saveToEntity,
        updateToEntity
    }
}

export const saveToEntity = (dto: CreateCategoryRequest, id: number): CategoryEntity => {
    return {
        id: id,
        name: dto.name,
        description: dto.description
    }
}

export const updateToEntity = (dto: UpdateCategoryRequest): CategoryEntity => {
    return {
        id: dto.id,
        name: dto.name,
        description: dto.description
    }
}