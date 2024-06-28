import { categoriesMockData } from "@/lib/category/infrastructure/category-mock-db";
import { mockRepository } from "@/lib/common/infrastructure/mock-repository";

export const createCategoryMockRepository = () => mockRepository(categoriesMockData());