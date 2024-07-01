import { Service } from "@/lib/common/domain/service";
import { CategoryEntity, CreateCategoryRequest } from "../domain/category.entity";

export const createCategoryMockService: Service<CategoryEntity, CreateCategoryRequest, CategoryEntity, CategoryEntity, CategoryEntity> = (repository) => {
    return {
        getAll: () => {
            return repository.getAll()
        },
        getPage: (pageable) => repository.getPage(pageable),
        getById: (id) => repository.getById(String(id)),
        save: (category) => {
            const {name, description} = category;
            let categoryEntity: CategoryEntity = {
                id: 0,
                name: name,
                description: description
            }
            return repository.save(categoryEntity);
        },
        update: (entity, idC) => {
            const { id, name, description } = entity;
            let categoryEntity: CategoryEntity = {
                id: 0,
                name: name,
                description: description
            }
            return repository.update(categoryEntity, idC);
        },
        delete: (id) => repository.delete(id)
    }
}