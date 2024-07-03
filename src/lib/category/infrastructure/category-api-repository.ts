import { getCategoryModule } from "@/lib/common/domain/module";
import { apiRepository } from "@/lib/common/infrastructure/api-repository";
import { CategoryEntity, CreateCategoryRequest } from "../domain/category.entity";

export const createCategoryAPIRepository = () => apiRepository<CategoryEntity, CreateCategoryRequest>(getCategoryModule().basePath);