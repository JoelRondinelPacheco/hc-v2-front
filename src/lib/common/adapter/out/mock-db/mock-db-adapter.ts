import { CategoryEntity, CreateCategoryRequestB, UpdateCategoryRequest } from "@/lib/category/domain/category.entity";
import { categoriesMockData } from "@/lib/category/adapter/output/category-mock-db";
import { PersistenceOutPort, PersistenceOutPortTEST } from "@/lib/common/application/ports/out/persistence-out-port";

const categories: CategoryEntity[] = categoriesMockData();

export const MockDBAdapter  = (): PersistenceOutPort<CategoryEntity, CreateCategoryRequestB, UpdateCategoryRequest>  => {
    return {
        getAll() {
            return Promise.resolve(categories);
        },
        getPage(pageable) {
            throw new Error("Todo impl")
        },
        getById(pathVariable) {
            return Promise.resolve(categories[0]);
        },
        save(entity) {
            return Promise.resolve(categories[0]);
        },
        update(dto, id) {
            throw new Error("Todo impl")
        },
        delete(id) {
            
        },
    }
}

