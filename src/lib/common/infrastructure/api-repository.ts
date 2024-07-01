import { getController } from "@/lib/common/application/controller";
import { apiClient } from "@/lib/common/infrastructure/api-client";
import { Page } from "@/lib/common/domain/pagination";
import { EntityBase } from "../domain/entity-base";
import { Repository } from "../domain/repository";

export const apiRepository = <T extends EntityBase, TSaveDTO, TEditDTO>(endpoint: string): Repository<T, TSaveDTO, TEditDTO> => {
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