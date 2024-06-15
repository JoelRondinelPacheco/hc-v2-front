import { CategoryBase, CategoryEntity } from "@/domain/category.domain";
import { PageData, Pageable } from "@/domain/commons.domain";
import { categoriesMockData } from "./category-mock-db";

export class CategoryMockApi {

    constructor() {
        this.categories = categoriesMockData();
    }

    categories: CategoryEntity[];

    addCategory(category: CategoryBase): CategoryEntity {
        return {
            id: 1,
            name: category.name,
            description: category.description
        }
    }

    getAll(pageable: Pageable) {

    }

    update(category: CategoryEntity) {

    }
}