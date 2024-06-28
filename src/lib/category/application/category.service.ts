import { CategoryEntity } from "@/domain/category.domain";
import { Pageable } from "../../common/domain/pagination";
import { Repository } from "@/lib/common/domain/repository";

export const createCategoryService = <T>(repository: Repository<T>) => {
    //No retorna repository, porque se pueden hacer otras cosas
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