import { CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest } from "../domain/category.entity";
import { createUseCases } from "@/lib/common/application/use-cases/use-cases";
import { PersistenceOutPort } from "@/lib/common/application/ports/out/persistence-out-port";
import { InputMapper } from "@/lib/common/adapter/mapper/mapper";
import { CategoryDTO } from "./dto/category.dto";

export const createCategoryUseCases = (
    repository: PersistenceOutPort<CategoryEntity, CreateCategoryRequest, UpdateCategoryRequest>,
    mapper: InputMapper<CategoryDTO, CreateCategoryRequest, UpdateCategoryRequest>
    ) => createUseCases(repository, mapper);
