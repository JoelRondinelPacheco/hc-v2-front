import { Pageable, Page } from "./pagination";
import { EntityBase } from "../domain/entity-base";
import { BaseCall, GenericCall } from "./call";


/*
export interface Repository<T extends BaseCall> {
    getAll: () => T;
    getPage(pageable: Pageable): T;
    save(entity: EntityBase): T;
    getById: (id: number) => T;
    delete(id: number): void;
}*/

export interface Repository<T> {
    getAll: () => GenericCall<T[]>;
    getPage(pageable: Pageable): GenericCall<Page<T>>;
    save(entity: EntityBase): GenericCall<T>;
    getById: (id: number) => GenericCall<T>;
    delete(id: number): void;
}