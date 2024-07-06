import { OutputMapper } from "@/lib/common/adapter/mapper/mapper"
import { CreateServiceRequest, ServiceEntity, UpdateServiceRequest } from "../../domain/service.entity"

export const createServiceOutputMapper = (): OutputMapper<ServiceEntity, CreateServiceRequest, UpdateServiceRequest> => {
    return {
        saveToEntity,
        updateToEntity
    }
}

export const saveToEntity = (dto: CreateServiceRequest, id: number): ServiceEntity => {
    return {
        id: id,
        description: dto.description,
        name: dto.name,
        price: dto.price,
        createdAt: new Date(),
        updatedAt: new Date(),
        category: {
            id: 0,
            name: "",
            description: ""
        }
    }
}

export const updateToEntity = (dto: UpdateServiceRequest): ServiceEntity => {
    return {
        id: dto.id,
        description: dto.description,
        name: dto.name,
        price: dto.price,
        createdAt: new Date(),
        updatedAt: new Date(),
        category: {
            id: 0,
            name: "",
            description: ""
        }
    }
}