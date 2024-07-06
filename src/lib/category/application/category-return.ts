import { Page } from "../../common/domain/entities/pagination";
import { CategoryEntity } from "../domain/category.entity";

export type CategoryMockRepositoryReponse = CategoryEntity | CategoryEntity[] | Page<CategoryEntity>