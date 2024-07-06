import { PersistenceOutPort } from "@/lib/common/application/ports/out/persistence-out-port";
import { CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest } from "../../domain/category.entity";
import { getAllUseCase } from "@/lib/common/application/ports/in/use-cases-input-port";

export const getAllCategoriesUseCase = (repository: PersistenceOutPort<CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest>): getAllUseCase<CategoryEntity> => {
    return () => {
        return repository.getAll();
    }
}