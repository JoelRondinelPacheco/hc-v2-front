import { InputMapper } from "@/lib/common/adapter/mapper/mapper"
import { ClientDTO } from "../../application/dto/client-dto"
import { CreateClientRequest, UpdateClientRequest } from "../../domain/client.entity"

export const createClientInputMapper = (): InputMapper<ClientDTO, CreateClientRequest, UpdateClientRequest> => {
    return {
        driverDTOtoSave: clientDTOToSave,
        driverDTOtoUpdate: clientDTOToUpdate
    }
}
export const clientDTOToSave = (dto: ClientDTO): CreateClientRequest => {
    const { name, lastname, email, address, dni, birthday, phoneNumber, roleId, password } = dto;
    return {
        name,
        lastname,
        email,
        address,
        dni,
        birthday,
        phoneNumber,
    }
}

export const clientDTOToUpdate = (dto: ClientDTO): UpdateClientRequest => {
    const { id, personId, name, lastname, email, address, dni, birthday, phoneNumber } = dto;
    return {
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