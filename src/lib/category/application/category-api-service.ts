import { CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest } from "../domain/category.entity";
import { createAPIUseCases } from "@/lib/common/application/service";
import { PersistenceOutPort } from "@/lib/common/application/ports/out/persistence-out-port";
import { categoryMapper } from "../adapter/mapper/category.mapper";

export const createCategoryAPIService = (repository: PersistenceOutPort<CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest>) => createAPIUseCases(repository, categoryMapper());
