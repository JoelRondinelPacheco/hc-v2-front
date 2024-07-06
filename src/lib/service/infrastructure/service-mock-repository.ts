import { Repository } from "@/lib/common/domain/repository";
import { CreateServiceRequest, ServiceEntity } from "../domain/service.entity";
import { getController } from "@/lib/common/application/controller";
import { mockPromise } from "@/lib/common/domain/entities/mock-promise";
import { getPage } from "@/lib/common/domain/entities/pagination";

export const createServiceMockRepository = (data: ServiceEntity[]): Repository<ServiceEntity, CreateServiceRequest> => {
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
                response = data[data.length - 1];
            }

            const request = mockPromise(response, controller);
            return { request, controller }
        },
        save: (entityDTO) => {
            const controller = getController();
            let request;
            const { id, name, description, price, categoryId} = entityDTO;

            let serviceEntity: ServiceEntity = {
                id: data.length + 1,
                name: name,
                description: description,
                price: price,
                createdAt: new Date(),
                updatedAt: new Date(),
                category: {
                    id: categoryId,
                    name: "",
                    description: ","
                }
            }

            const entityIndex = data.findIndex((c) => c.id === Number(id));

            if(entityIndex === -1 || id === 0) {
                
                data.push(serviceEntity);
                
                request = mockPromise(serviceEntity, controller);
            } else {
                data[entityIndex] = {...serviceEntity, id: data[entityIndex].id}
                request = mockPromise(data[entityIndex], controller);
            }

            return { request, controller };
        },
        update: (entity, idC) => {
            
            const controller = getController();
            const { id, name, description, price, categoryId } = entity;
            let serviceEntity: ServiceEntity = {
                id: id,
                name: name,
                description: description,
                price: price,
                createdAt: new Date(),
                updatedAt: new Date(),
                category: {
                    id: categoryId,
                    name: "",
                    description: ","
                }
            }
            const entityIndex = data.findIndex((c) => c.id === Number(id));
            let response;
            if (entityIndex !== -1) {
                data[entityIndex] = serviceEntity;
                response = data[entityIndex]
            } else {
                //todo error
                data.push(serviceEntity)
            }
            const request = mockPromise(serviceEntity, controller);

            return { request, controller};
        },
        delete(id) {
            const entityIndex = data.findIndex((c) => c.id === Number(id));
            //todo complete
        },
    }

}