import { ClientEntity, CreateClientRequest, EmployeeEntity } from "@/domain/client.domain";
import { Service } from "@/lib/common/domain/service";
import { EditClientRequest } from "../domain/client.entity";
import { CreateEmployeeRequest, EditEmployeeRequest } from "../domain/employee.entity";

export const createEmployeeMockService: Service<EmployeeEntity, CreateEmployeeRequest, EditEmployeeRequest, EmployeeEntity, EmployeeEntity> = (repository) => {
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
            const { name, lastname, email, dni, address, birthday, phoneNumber, salary} = entity;
            const clientEntity: EmployeeEntity = {
                id: 0,
                salary: salary,
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
            const clientEntity: EmployeeEntity = {
                id: entity.id,
                salary: entity.salary,
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