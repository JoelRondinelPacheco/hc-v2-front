import { getController } from "../application/controller";
import { PersistenceOutPort } from "../application/ports/out/persistence-out-port";
import { EntityBase } from "../domain/entities/entity-base";
import { mockPromise } from "../domain/entities/mock-promise";
import { Page, Pageable, getPage } from "../domain/entities/pagination";
import { Repository } from "../domain/repository";
import { InputMapper, OutputMapper } from "./mapper/mapper";

export const mockRepository = <T extends EntityBase, TSave, TUpdate extends EntityBase>(
    entity: T[],
    mapper: OutputMapper<T, TSave, TUpdate>
    ): PersistenceOutPort<T, TSave, TUpdate> => {
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

            data.push(mapper.saveToEntity(entityDTO));
            categoryResponse = data[data.length - 1]
            
            const request = mockPromise<T>(categoryResponse, controller);

            return { request, controller };
        },
        delete: (id) => {
        },
        update: (dto, id)=> {
            const controller = getController();
            const data = entity
            const update: T = mapper.udapteToEntity(dto);

            const entityIndex = data.findIndex((c) => c.id === Number(id));
            let response;
            if (entityIndex !== -1) {
                data[entityIndex] = update;
                response = data[entityIndex]
            } else {
                //todo error
                data[data.length - 1] = update;
                response = data[data.length - 1]
            }
            const request = mockPromise<T>(response, controller);

            return { request, controller}
        },
    }
}