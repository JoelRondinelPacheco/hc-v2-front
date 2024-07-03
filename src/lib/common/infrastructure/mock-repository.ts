import { getController } from "../application/controller";
import { EntityBase } from "../domain/entity-base";
import { mockPromise } from "../domain/mock-promise";
import { Page, Pageable, getPage } from "../domain/pagination";
import { Repository } from "../domain/repository";

export const mockRepository = <T extends EntityBase>(entity: T[]): Repository<T, T, T> => {
    return {
        getAll: () => {
            const controller = getController();
            const data: T[] = entity;
           
            const request = mockPromise<T[]>(data, controller);
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
        getById: (id) => {
            const controller = getController();
            const data: T[] = entity;

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
            const request = mockPromise<T>(response, controller);
            return { request, controller }
        },
        save: (entityDTO) => {
            const controller = getController();
            const data: T[] = entity;
            let categoryResponse: T;

            entityDTO.id = data.length + 1
                data.push(entityDTO);
                categoryResponse = data[data.length - 1]
            
            const request = mockPromise<T>(categoryResponse, controller);

            return { request, controller };
        },
        delete: (id) => {
        },
        update: (dto, id)=> {
            const controller = getController();
            const data = entity

            const entityIndex = data.findIndex((c) => c.id === Number(id));
            let response;
            if (entityIndex !== -1) {
                data[entityIndex] = dto;
                response = data[entityIndex]
            } else {
                //todo error
                data[data.length - 1] = dto;
                response = data[data.length - 1]
            }
            const request = mockPromise<T>(response, controller);

            return { request, controller}
        },
    }
}