

//export type Service<T, TSave, TEdit, TRepoSave = TSave, TRepoUpdate = TEdit> = (repository: Repository<T, TRepoSave, TRepoUpdate>) 
//=> ServicesActions<T, TSave, TEdit>

import { Service } from "@/lib/common/domain/service";
import { CategoryEntity, CreateCategoryRequest } from "../domain/category.entity";
import { createAPIService } from "@/lib/common/application/service";

export const createCategoryAPIService: Service<CategoryEntity, CreateCategoryRequest, CategoryEntity> = (repository) => createAPIService(repository);
