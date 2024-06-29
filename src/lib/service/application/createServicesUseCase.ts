import { Repository } from "@/lib/common/domain/repository";
import { CreateServiceRequest, ServiceEntity } from "../domain/service.entity";
import { CategoryEntity } from "@/lib/category/domain/category.entity";
import { GenericCall } from "@/lib/common/domain/call";

export interface CreateServiceUseCase {
    create: (serviceDTO: CreateServiceRequest, serviceRepository: Repository<ServiceEntity>, categoryRepository: Repository<CategoryEntity>) => GenericCall<ServiceEntity>
}

export const createService = (): CreateServiceUseCase => {
    //todo validations
    return {
        create: (serviceDTO, serviceRepository) => {
        
            const { name, description, price, categoryId } = serviceDTO;
            
            let service: ServiceEntity = {
                id: 0,
                name: name,
                description: description,
                price: price,
                createdAt: new Date(),
                updatedAt: new Date(),
                category: {
                    id: categoryId,
                    name: "",
                    description: "",
                }
            
            };

            return serviceRepository.save(service);
        }
    }
}