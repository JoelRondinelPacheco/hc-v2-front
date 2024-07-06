import { getCategoryModule } from "@/lib/common/domain/module";
import { CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest } from "../../domain/category.entity";
import { apiRepository } from "@/lib/common/adapter/api-repository";

export const createCategoryAPIRepository = () => apiRepository<CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest>(getCategoryModule().basePath);