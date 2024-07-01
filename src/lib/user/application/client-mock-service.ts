import { ClientEntity, CreateClientRequest } from "@/domain/client.domain";
import { Service } from "@/lib/common/domain/service";
import { EditClientRequest } from "../domain/client.entity";

export const createClientMockService: Service<ClientEntity, CreateClientRequest, EditClientRequest, ClientEntity, ClientEntity> = (repository) => {
    return {
        getAll() {
            return repository.getAll();
        },
        getPage(pageable) {
            return repository.getPage(pageable);
        },
        getById(id) {
            return repository.getById(String(id));
        },
        save(entity) {
            const { name, lastname, email, dni, address, birthday, phoneNumber} = entity;
            const clientEntity: ClientEntity = {
                id: 0,
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
            return repository.save(clientEntity);
        },
        update(entity, idC) {
            const { id, name, lastname, email, dni, address, birthday, phoneNumber} = entity.person;
            const clientEntity: ClientEntity = {
                id: entity.id,
                person: {
                    id: id,
                    name: name,
                    lastname: lastname,
                    email: email,
                    dni: dni,
                    address: address,
                    birthday: birthday,
                    phoneNumber: phoneNumber 
                }
            }

            return repository.update(clientEntity, idC);
        },
        delete(id) {
            return repository.delete(id);
        },
    }
}