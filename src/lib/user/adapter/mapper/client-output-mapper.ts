import { OutputMapper } from "@/lib/common/adapter/mapper/mapper";
import { ClientEntity, CreateClientRequest, UpdateClientRequest } from "../../domain/client.entity";

export const createClientOutputMapper = (): OutputMapper<ClientEntity, CreateClientRequest, UpdateClientRequest> => {
    return {
        saveToEntity,
        updateToEntity,
    }
}

const saveToEntity = (dto: CreateClientRequest, id: number): ClientEntity => {
    const { name, lastname, email, address, dni, birthday, phoneNumber } = dto;
    return {
        id: id,
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


const updateToEntity = (dto: UpdateClientRequest): ClientEntity => {
    const { name, lastname, email, address, dni, birthday, phoneNumber , id, personId} = dto;
    return {
        id: id,
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