import { Page } from "../../common/domain/pagination";
import { CategoryEntity } from "../domain/category";

export type CategoryMockRepositoryReponse = CategoryEntity | CategoryEntity[] | Page<CategoryEntity>