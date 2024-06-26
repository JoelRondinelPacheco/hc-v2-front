import { CategoryEntity } from "@/domain/category.domain";
import { apiRepository } from "@/lib/common/infraestructure/api-repository";

export const createCategoryRepository = apiRepository<CategoryEntity>("/category");