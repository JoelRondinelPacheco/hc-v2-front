import { CategoryEntity } from "@/domain/category.domain";
import { MockRepository } from "./mock-repository";
import { categoriesMockData } from "../category/category-mock-db";

export class MockCategoryReposityory extends MockRepository<CategoryEntity> {

    constructor(){
        super(categoriesMockData());
    }

}