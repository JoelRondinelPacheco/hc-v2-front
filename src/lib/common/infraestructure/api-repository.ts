import { getController } from "@/lib/common/application/controller";
import { apiClient } from "@/lib/common/application/api-client";
import { Page } from "@/lib/common/domain/pagination";
import { Repository } from "@/lib/common/domain/repository";
import { EntityBase } from "../domain/entity-base";

export const apiRepository = <T extends EntityBase>(endpoint: string): Repository<T> => {
    return {
        getAll: () => {
            const controller = getController();
            const request = apiClient.get<T[]>(endpoint, {signal: controller.signal});
            
            return { request, controller }
        },
        getPage: (pageable) => {
            const controller = getController();
            const request = apiClient.get<Page<T>>(
                `${endpoint}?pageIndex=${pageable.pageIndex}&pageSize=${pageable.pageSize}`,
                { signal: controller.signal }
            );

            return { request, controller };
        },
        save: (entity) => {
            const controller = getController();
            const request = apiClient.post<T>(
                `${endpoint}/${entity.id}`,
                entity,
                { signal: controller.signal}
            )
            
            return { request, controller }
        },
        getById: (id) => {
            const controller = getController();
            const request = apiClient.get<T>(
                `${endpoint}/${id}`,
                { signal: controller.signal}
            )
            
            return { request, controller }
        },
        delete: (id) => {
            throw new Error();
        },
    }
}