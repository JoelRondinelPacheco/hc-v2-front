import { getController } from "@/lib/common/application/controller";
import { apiClient } from "@/lib/common/application/api-client";
import { CategoryEntity } from "@/domain/category.domain";
import { Page } from "@/lib/common/domain/pagination";
import { Repository } from "@/lib/common/domain/repository";
import { ApiCall } from "@/lib/common/application/api-call";
import { CategoryMockRepositoryReponse } from "../application/category-return";
import { GenericCall } from "@/lib/common/domain/call";

export const createCategoryAPiRepository = (): Repository<CategoryEntity> => {
    return {
        getAll: () => {
            const controller = getController();
            const request = apiClient.get<CategoryEntity[]>("/category", {signal: controller.signal});
            
            return { request, controller }
        },
        getPage: (pageable) => {
            const controller = getController();
            const request = apiClient.get<Page<CategoryEntity>>(
                `/category?pageIndex=${pageable.pageIndex}&pageSize=${pageable.pageSize}`,
                { signal: controller.signal }
            );

            return { request, controller };
        },
        save: (category) => {
            throw new Error();
        },
        getById: (id) => {
            throw new Error();
        },
        delete: (id) => {
            throw new Error();
        },
    }
}