import { CreateEmployeeRequest, EmployeeEntity } from "../domain/employee.entity";
import { Repository } from "@/lib/common/domain/repository";
import { getController } from "@/lib/common/application/controller";
import { mockPromise } from "@/lib/common/domain/mock-promise";
import { getPage } from "@/lib/common/domain/pagination";

export const createEmployeeMockRepository = (data: EmployeeEntity[]): Repository<EmployeeEntity, CreateEmployeeRequest> => {
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

            const { name, lastname, email, dni, address, birthday, phoneNumber, salary} = entity;
            const clientEntity: EmployeeEntity = {
                id: data.length + 1,
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
            
            data.push(clientEntity);
            
            const request = mockPromise(clientEntity, controller);

            return { request, controller };
        },
        update(entity, idC) {
            const controller = getController();

            const { id, personId, name, lastname, email, dni, address, birthday, phoneNumber, salary} = entity;
            const employeeEntity: EmployeeEntity = {
                id: id,
                salary: entity.salary,
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
                data[entityIndex] = employeeEntity;
                response = data[entityIndex]
            } else {
                //todo error
                data.push(employeeEntity)
            }
            const request = mockPromise(employeeEntity, controller);

            return { request, controller};
        },
        delete(id) {
            //todo
        },
    }
}