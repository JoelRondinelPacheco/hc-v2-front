import { Service } from "../domain/service";

export const createService: Service = (repository) => {
    return {
        getAll: () => repository.getAll(),
        getPage: (pageable) => repository.getPage(pageable),
        getById: (id) => repository.getById(id),
        save: (entity) => repository.save(entity),
        delete: (id) => repository.getById(id)
    }
}