import { Pageable } from "@/domain/commons.domain";

export interface MockDB {

   create(entity: any): any;

    getAll(): any;

    getPage(pageable: Pageable): any;

    getById(id: number): any;

    update(entity: any): any;

    delete(id: number): void;

    
}