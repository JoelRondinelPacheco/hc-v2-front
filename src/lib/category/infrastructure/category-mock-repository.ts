import { categoriesMockData } from "@/domain/mock-backend/mock-database/category-mock-db";
import { mockPromise } from "../../common/domain/mock-promise";
import { getController } from "../../common/application/controller";
import { Page, Pageable, getPage } from "../../common/domain/pagination";
import { CategoryEntity } from "../domain/category";
import { Repository, } from "@/lib/common/domain/repository";


   export const createCategoryMockRepository = (): Repository<CategoryEntity> => {
    return {
        getAll: () => {
            const controller = getController();
            const categories: CategoryEntity[] = categoriesMockData();
            const request = mockPromise<CategoryEntity[]>(categories, controller);
            return {
                request,
                controller
            }
        },
        getPage: (pageable: Pageable) => {
            const categories: CategoryEntity[] = categoriesMockData();
            const categoryPage = getPage(pageable, categories);

            const controller = getController();
            const request = mockPromise<Page<CategoryEntity>>(categoryPage, controller);
            
            return { request, controller}
        },
        getById: (id: number) => {
            const controller = getController();
            const categories: CategoryEntity[] = categoriesMockData();

            const categoryIndex = categories.findIndex((c) => c.id === id);

            //let request: Request<CategoryEntity>;
            //if (categoryIndex !== -1) {
            //    request = mockPromise<CategoryEntity>(categories[categoryIndex], controller);
            //} else {
            //    request = mockPromise<
            //}
            //todo lanzar error
            

            const request = mockPromise<CategoryEntity>(categories[categoryIndex], controller);

            //primero suponemos que esta todo bien
            return { request, controller }
        },
        save: (category: CategoryEntity) => {
            const controller = getController();
            const categories: CategoryEntity[] = categoriesMockData();
            let categoryIndex = categories.findIndex((c) => c.id === category.id);
            let categoryResponse: CategoryEntity;

            if (!category.id || category.id === 0 || categoryIndex === -1) {
                category.id = categories.length + 1
                categories.push(category);
                categoryResponse = categories[categories.length - 1]
            } else {
                categories[categoryIndex] = category;
                categoryResponse = category;
            }
            
            const request = mockPromise<CategoryEntity>(categoryResponse, controller);

            return { request, controller };
        },
        delete: (id) => {
            
        },
    }
}