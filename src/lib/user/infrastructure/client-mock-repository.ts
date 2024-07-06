import { Repository } from "@/lib/common/domain/repository";
import { ClientEntity, CreateClientRequest } from "../domain/client.entity";
import { getController } from "@/lib/common/application/controller";
import { mockPromise } from "@/lib/common/domain/entities/mock-promise";
import { getPage } from "@/lib/common/domain/entities/pagination";


export const createClientMockRepository = (data: ClientEntity[]): Repository<ClientEntity, CreateClientRequest> => {
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
        save(entity) {
            const controller = getController();
            let request;

            const { id, name, lastname, email, dni, address, birthday, phoneNumber} = entity;
            const clientEntity: ClientEntity = {
                id: data.length + 1,
                person: {
                    id: 0,
                    name: name,
                    lastname: lastname,
                    email: email,
                    dni: dni,
                    address: address,
                    birthday: birthday,
                    phoneNumber: phoneNumber 
                }
            }

            const entityIndex = data.findIndex((c) => c.id === Number(id));

            if (entityIndex === -1 || id === 0) {
                data.push(clientEntity);
                request = mockPromise(clientEntity, controller);
            } else {
                data[entityIndex] = {...clientEntity, id: data[entityIndex].id}
                request = mockPromise(data[entityIndex], controller)
            }
    

            return { request, controller };
        },
        update(entity, idC) {

            const controller = getController();
            const { id, personId, name, lastname, email, dni, address, birthday, phoneNumber} = entity;
            const clientEntity: ClientEntity = {
                id: id,
                person: {
                    id: personId,
                    name: name,
                    lastname: lastname,
                    email: email,
                    dni: dni,
                    address: address,
                    birthday: birthday,
                    phoneNumber: phoneNumber 
                }
            }

            
            const entityIndex = data.findIndex((c) => c.id === Number(id));
            let response;
            if (entityIndex !== -1) {
                data[entityIndex] = clientEntity;
                response = data[entityIndex]
            } else {
                //todo error
                data.push(clientEntity)
            }
            const request = mockPromise(clientEntity, controller);

            return { request, controller};
        },
        delete(id) {
            //todo implement
        },
    }
}