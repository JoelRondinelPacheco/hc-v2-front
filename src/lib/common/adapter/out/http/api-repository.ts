import { getController } from "@/lib/common/domain/entities/controller";
import { apiClient } from "@/lib/common/adapter/out/http/api-client";
import { EntityBase } from "../../../domain/entities/entity-base"; 
import { PersistenceOutPort } from "../../../application/ports/out/persistence-out-port";

export const apiRepository = <T extends EntityBase, TSave, TUpdate extends EntityBase>(endpoint: string): PersistenceOutPort<T, TSave, TUpdate> => {
    return {
        getAll: () => {
            const controller = getController();
            const request = apiClient.get(endpoint, {signal: controller.signal});
            
            return { request, controller }
        },
        getPage: (pageable) => {
            let url = `?pageIndex=${pageable.pageIndex}&pageSize=${pageable.pageSize}`

            const controller = getController();
            const request = apiClient.get(endpoint+url, {signal: controller.signal});
            return { request, controller}
        },
        getById: (id) => {
            const controller = getController();
            const request = apiClient.get(`${endpoint}/${id}`, {signal: controller.signal});
            
            return { request, controller }
        },
        save: (entity) => {
            console.log(entity)
            const controller = getController();
            const request = apiClient.post<T>(
                `${endpoint}`,
                entity,
                { signal: controller.signal}
            )
            
            return { request, controller }
        },
        delete: (id) => {
            throw new Error();
        },
        update: (dto, id) => {
            const controller = getController();
            const request = apiClient.put(`${endpoint}/${id}`, dto,  {signal: controller.signal});

            return { request, controller};
        }
    }
}