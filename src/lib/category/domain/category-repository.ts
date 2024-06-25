import { CategoryEntity } from "./category";
import { Page, Pageable } from "@/lib/common/domain/pagination";
import { Request } from "../../common/domain/request";

export interface CategoryRepository {
    getAll(): Request<CategoryEntity[]>;
    getPage(pageable: Pageable): Request<Page<CategoryEntity>>
    save(category: CategoryEntity): void;
    getById(id: number): Request<CategoryEntity>;
    delete(id: number): void;
}