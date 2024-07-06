import { CategoryDTO } from "../../application/dto/category.dto";
import { CreateCategoryRequestB, UpdateCategoryRequest } from "../../domain/category.entity";

export const categoryDtoToSave = (dto: CategoryDTO): CreateCategoryRequestB => {
    return {
        name: dto.name,
        description: dto.description
    }
}

export const categoryDtoToUpdate = (dto: CategoryDTO): UpdateCategoryRequest => {
    ///todo if dto !== 0 -> sino throw
    return {
        id: dto.id,
        name: dto.name,
        description: dto.description
    }
}