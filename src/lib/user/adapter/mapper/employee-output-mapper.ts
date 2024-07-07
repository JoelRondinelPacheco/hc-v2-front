import { OutputMapper } from "@/lib/common/adapter/mapper/mapper";
import { CreateEmployeeRequest, EmployeeEntity, UpdateEmployeeRequest } from "../../domain/employee.entity";

export const createEmployeeOutputMapper = (): OutputMapper<EmployeeEntity, CreateEmployeeRequest, UpdateEmployeeRequest> => {
    return {
        saveToEntity,
        updateToEntity,
    }
}

const saveToEntity = (dto: CreateEmployeeRequest, id: number): EmployeeEntity => {
    const { name, lastname, email, address, dni, birthday, phoneNumber, roleId, password, salary } = dto;
    return {
        id: id,
        salary,
        person: {
            id: id,
            name,
            lastname,
            email,
            address,
            dni,
            birthday,
            phoneNumber,
        }
    }
}


const updateToEntity = (dto: UpdateEmployeeRequest): EmployeeEntity => {
    const { name, lastname, email, address, dni, birthday, phoneNumber, roleId, password , salary, id, personId} = dto;
    return {
        id: id,
        salary,
        person: {
            id: personId,
            name,
            lastname,
            email,
            address,
            dni,
            birthday,
            phoneNumber,
        }
    }
}