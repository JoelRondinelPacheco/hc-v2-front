import { InputMapper } from "@/lib/common/adapter/mapper/mapper";
import { ServiceDTO } from "../../application/dto/service-dto";
import { CreateServiceRequest, UpdateServiceRequest } from "../../domain/service.entity";


export const createServiceInputMapper = (): InputMapper<ServiceDTO, CreateServiceRequest, UpdateServiceRequest> => {
    return {
        driverDTOtoSave: serviceDTOToSave,
        driverDTOtoUpdate: serviceDTOToUpdate
    }
}
export const serviceDTOToSave = (dto: ServiceDTO): CreateServiceRequest => {
    return {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        categoryId: dto.category.id
    }
}

export const serviceDTOToUpdate = (dto: ServiceDTO): UpdateServiceRequest => {
    ///todo if dto !== 0 -> sino throw
    return {
        id: dto.id,
        name: dto.name,
        description: dto.description,
        price: dto.price,
        categoryId: dto.category.id
    }
}
/*
export const categoryAPIResponseToEntity = (category: any): CategoryEntity => {
    //todo validations
    return {
        id: category.id,
        name: category.name,
        description: category.description,
    }
}*/