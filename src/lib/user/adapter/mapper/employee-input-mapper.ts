import { InputMapper } from "@/lib/common/adapter/mapper/mapper";
import { EmployeeDTO } from "../../application/dto/employee-dto";
import { CreateEmployeeRequest, UpdateEmployeeRequest } from "../../domain/employee.entity";

export const createEmployeeInputMapper = (): InputMapper<EmployeeDTO, CreateEmployeeRequest, UpdateEmployeeRequest> => {
    return {
        driverDTOtoSave: employeeDTOToSave,
        driverDTOtoUpdate: employeeDTOToUpdate
    }
}
export const employeeDTOToSave = (dto: EmployeeDTO): CreateEmployeeRequest => {
    const { name, lastname, email, address, dni, birthday, phoneNumber, roleId, password, salary } = dto;
    return {
        salary,
        name,
        lastname,
        email,
        address,
        dni,
        birthday,
        phoneNumber,
    }
}

export const employeeDTOToUpdate = (dto: EmployeeDTO): UpdateEmployeeRequest => {
    const { id, personId, name, lastname, email, address, dni, birthday, phoneNumber, roleId, password, salary } = dto;
    return {
        salary,
        id: id,
        personId,
        name,
        lastname,
        email,
        address,
        dni,
        birthday,
        phoneNumber,
    }
}