import { Service } from "@/lib/common/domain/service";
import { CreateServiceRequest, EditServiceRequest, ServiceEntity } from "../domain/service.entity";

export const createServiceMockService: Service<ServiceEntity, CreateServiceRequest, EditServiceRequest, ServiceEntity, ServiceEntity> = (repository) => {
    return {
        getAll: () => {
            return repository.getAll()
        },
        getPage: (pageable) => repository.getPage(pageable),
        getById: (id) => repository.getById(String(id)),
        save: (service) => {
            const { name, description, price, categoryId} = service;
            let serviceEntity: ServiceEntity = {
                id: 0,
                name: name,
                description: description,
                price: price,
                createdAt: new Date(),
                updatedAt: new Date(),
                category: {
                    id: categoryId,
                    name: "",
                    description: ","
                }
            }
            return repository.save(serviceEntity);
        },
        update: (entity, idC) => {
            const { id, name, description, price, categoryId } = entity;
            let serviceEntity: ServiceEntity = {
                id: id,
                name: name,
                description: description,
                price: price,
                createdAt: new Date(),
                updatedAt: new Date(),
                category: {
                    id: categoryId,
                    name: "",
                    description: ","
                }
            }
            return repository.update(serviceEntity, idC);
        },
        delete: (id) => repository.delete(id)
    }
}