import { categoriesMockData } from "@/domain/mock-backend/mock-database/category-mock-db";
import { mockRepository } from "@/lib/common/infraestructure/mock-repository";

export const createCategoryMockRepository = () => mockRepository(categoriesMockData());