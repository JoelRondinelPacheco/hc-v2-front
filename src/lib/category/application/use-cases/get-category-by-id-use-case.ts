import { PersistenceOutPort } from "@/lib/common/application/ports/out/persistence-out-port";
import { CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest } from "../../domain/category.entity";
import { GetByIdUseCase } from "@/lib/common/application/ports/in/use-cases-input-port";

export const getCategoryByIdUseCase = (repository: PersistenceOutPort<CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest>): GetByIdUseCase<CategoryEntity> => {
    return (id) => {
        return repository.getById(String(id));
    }
}