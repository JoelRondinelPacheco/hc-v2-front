import { getController } from "../application/controller";
import { EntityBase } from "../domain/entity-base";
import { mockPromise } from "../domain/mock-promise";
import { Page, Pageable, getPage } from "../domain/pagination";
import { Repository } from "../domain/repository";


export const mockRepository = <T extends EntityBase>(entity: T[]): Repository<T> => {
    return {
        getAll: () => {
            const controller = getController();
            const categories: T[] = entity;
            const request = mockPromise<T[]>(categories, controller);
            return {
                request,
                controller
            }
        },
        getPage: (pageable: Pageable) => {
            const categories: T[] = entity;
            const categoryPage = getPage(pageable, categories);

            const controller = getController();
            const request = mockPromise<Page<T>>(categoryPage, controller);
            
            return { request, controller}
        },
        getById: (id: number) => {
            const controller = getController();
            const categories: T[] = entity;

            const categoryIndex = categories.findIndex((c) => c.id === id);

            //let request: Request<CategoryEntity>;
            //if (categoryIndex !== -1) {
            //    request = mockPromise<CategoryEntity>(categories[categoryIndex], controller);
            //} else {
            //    request = mockPromise<
            //}
            //todo lanzar error
            

            const request = mockPromise<T>(categories[categoryIndex], controller);

            //primero suponemos que esta todo bien
            return { request, controller }
        },
        save: (category: T) => {
            const controller = getController();
            const categories: T[] = entity;
            let categoryIndex = categories.findIndex((c) => c.id === category.id);
            let categoryResponse: T;

            if (!category.id || category.id === 0 || categoryIndex === -1) {
                category.id = categories.length + 1
                categories.push(category);
                categoryResponse = categories[categories.length - 1]
            } else {
                categories[categoryIndex] = category;
                categoryResponse = category;
            }
            
            const request = mockPromise<T>(categoryResponse, controller);

            return { request, controller };
        },
        delete: (id) => {
            
        },
    }
}

