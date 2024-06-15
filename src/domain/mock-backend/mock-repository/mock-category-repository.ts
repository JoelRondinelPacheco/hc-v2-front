import { CategoryEntity } from "@/domain/category.domain";
import { MockRepositoryImpl } from "./mock-repository-impl";
import { categoriesMockData } from "../mock-database/category-mock-db";

export class MockCategoryReposityory extends MockRepositoryImpl<CategoryEntity> {

    constructor(){
        super(categoriesMockData());
    }

}