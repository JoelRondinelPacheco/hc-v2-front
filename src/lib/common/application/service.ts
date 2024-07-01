import { CategoryEntity, CreateCategoryRequest } from "@/lib/category/domain/category.entity";
import { Service, ServicesActions } from "../domain/service";
import { Repository } from "../domain/repository";
import { EntityBase } from "@/domain/commons.domain";

export const createAPIService = <T, TUpdateDTO extends EntityBase>(repository: Repository<T, TUpdateDTO>): ServicesActions<T, TUpdateDTO> => {
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
            if (entity.id === 0) {
                return repository.save(entity);
            } else {
                return repository.update(entity, String(entity.id));
            }
        },
        update: (entity, id) => {
            return repository.update(entity, String(id));
        },
        delete: (id) => {
            return repository.delete(id);
        }
    }
}