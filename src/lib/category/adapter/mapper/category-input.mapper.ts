import { InputMapper } from "@/lib/common/adapter/mapper/mapper";
import { CategoryDTO } from "../../application/dto/category.dto";
import { CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest } from "../../domain/category.entity";


export const createCategoryInputMapper = (): InputMapper<CategoryDTO, CreateCategoryRequest, UpdateCategoryRequest> => {
    return {
        driverDTOtoSave: categoryDTOToSave,
        driverDTOtoUpdate: categoryDTOToUpdate
    }
}
export const categoryDTOToSave = (dto: CategoryDTO): CreateCategoryRequest => {
    return {
        name: dto.name,
        description: dto.description
    }
}

export const categoryDTOToUpdate = (dto: CategoryDTO): UpdateCategoryRequest => {
    ///todo if dto !== 0 -> sino throw
    return {
        id: dto.id,
        name: dto.name,
        description: dto.description
    }
}

export const categoryAPIResponseToEntity = (category: any): CategoryEntity => {
    //todo validations
    return {
        id: category.id,
        name: category.name,
        description: category.description,
    }
}