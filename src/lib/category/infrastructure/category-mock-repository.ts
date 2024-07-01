import { Repository } from "@/lib/common/domain/repository";
import { CategoryEntity, CreateCategoryRequest } from "../domain/category.entity";
import { getController } from "@/lib/common/application/controller";
import { mockPromise } from "@/lib/common/domain/mock-promise";
import { getPage } from "../../common/domain/pagination"

export const createCategoryMockRepository = (data: CategoryEntity[]): Repository<CategoryEntity, CreateCategoryRequest> => {
    return {
        getAll() {
            const controller = getController();
                       
            const request = mockPromise(data, controller);
            return {
                request,
                controller
            }
        },
        getPage(pageable) {
            const page = getPage(pageable, data);

            const controller = getController();
            const request = mockPromise(page, controller);
            
            return { request, controller}
        },
        getById: (id) => {
            const controller = getController();

            const entityIndex = data.findIndex((c) => c.id === Number(id));
            let response;
            if (entityIndex !== -1) {
                response = data[entityIndex];
            } else {
                //todo error
                response = data[data.length - 1];
            }
            //} else {
            //    request = mockPromise<
            //}
            //todo lanzar error
            const request = mockPromise(response, controller);
            return { request, controller }
        },
        save: (entityDTO) => {
            const controller = getController();
            const {name, description} = entityDTO;
            let categoryEntity: CategoryEntity = {
                id: data.length + 1,
                name: name,
                description: description
            }
            data.push(categoryEntity);
            
            const request = mockPromise(categoryEntity, controller);

            return { request, controller };
        },
        update: (entity, idC) => {
            
            const controller = getController();
            const { id, name, description } = entity;
            let categoryEntity: CategoryEntity = {
                id: id,
                name: name,
                description: description
            }
            const entityIndex = data.findIndex((c) => c.id === Number(id));
            let response;
            if (entityIndex !== -1) {
                data[entityIndex] = categoryEntity;
                response = data[entityIndex]
            } else {
                //todo error
                data.push(categoryEntity)
            }
            const request = mockPromise(categoryEntity, controller);

            return { request, controller};
        },
        delete(id) {
            const entityIndex = data.findIndex((c) => c.id === Number(id));
            //todo complete
        },
    }

}