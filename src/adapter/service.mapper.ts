import { ServiceEntity } from "@/domain/service.domain";

export const apiToDomain = (service: any): ServiceEntity => {
    return {
        code: service.id,
        name: service.name,
        description: service.description,
        price: service.price,
        id: service.id,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt,
        category: service.category
    }
}

export const apiToDomainArray = (services: any[]): ServiceEntity[] => {
    return services.map((service) => {
        return apiToDomain(service);
    })
}