import { saveUseCase } from "@/lib/common/application/ports/in/use-cases-input-port";
import { CategoryDTO } from "../dto/category.dto";
import { CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest } from "../../domain/category.entity";
import { PersistenceOutPort } from "@/lib/common/application/ports/out/persistence-out-port";
import { categoryDTOToSave, categoryDTOToUpdate } from "../../adapter/mapper/category-input.mapper";

export const saveCategoryUseCase  = (repository: PersistenceOutPort<CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest>): saveUseCase<CategoryDTO, CategoryEntity> => {
    return (dto) => {
        if (dto.id !== 0) {
            const category: UpdateCategoryRequest = categoryDTOToUpdate(dto);
            return repository.update(category, String(dto.id));
        } else {
            const category: CreateCategoryRequest = categoryDTOToSave(dto);
            return repository.save(category);
        }
    }
}