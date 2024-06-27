import { CategoryEntity } from "@/domain/category.domain";
import { getCategoryModule } from "@/lib/common/domain/module";
import { apiRepository } from "@/lib/common/infraestructure/api-repository";

export const createCategoryAPIRepository = () => apiRepository<CategoryEntity>(getCategoryModule().basePath);