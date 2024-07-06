import { CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest } from "../../domain/category.entity";
import { mockRepository } from "@/lib/common/adapter/out/mock-db/mock-repository";
import { OutputMapper } from "@/lib/common/adapter/mapper/mapper";

export const createCategoryMockRepository = (data: CategoryEntity[], mapper: OutputMapper<CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest>) => mockRepository(data, mapper);
