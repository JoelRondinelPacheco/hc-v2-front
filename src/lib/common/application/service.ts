import { CategoryEntity, CreateCategoryRequest } from "@/lib/category/domain/category.entity";
import { Service, ServicesActions } from "../domain/service";
import { Repository } from "../domain/repository";

export const createAPIService = <T, TSave, TEdit>(repository: Repository<T, TSave, TEdit>): ServicesActions<T, TSave, TEdit> => {
    return {
        getAll: () => {
            return repository.getAll();
        },
        getPage: (pageable) => {
            return repository.getPage(pageable)
        },
        getById: (id) => {
            return repository.getById(String(id))
        },
        save: (entity) => {
            return repository.save(entity);
        },
        update: (entity, id) => {
            return repository.update(entity, id);
        },
        delete: (id) => {
            return repository.delete(id);
        }
    }
}