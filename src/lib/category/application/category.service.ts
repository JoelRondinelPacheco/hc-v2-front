import { CategoryEntity } from "@/domain/category.domain";
import { CategoryRepository } from "../domain/category-repository";
import { Pageable } from "../../common/domain/pagination";

export const createCategoryService = (repository: CategoryRepository): CategoryRepository => {
    return {
        getAll: () => {
            /*
                Aqui irian validaciones por ejemplo
            */
            return repository.getAll()},
        getPage: (pageable: Pageable) => repository.getPage(pageable),
        getById: (id: number) => repository.getById(id),
        save: (category: CategoryEntity) => repository.save(category),
        delete: (id: number) => null
    }
}