import { Pageable } from "@/domain/commons.domain";
import { GenericCall } from "@/lib/common/domain/entities/call";
import { Page } from "@/lib/common/domain/entities/pagination";

export interface PersistenceOutPortTEST {
    get: <T>(id?: string | number, page?: Pageable) => Promise<T>;
    save: <TRequest, TResponse>(entity: TRequest) => Promise<TResponse>;
    update: <TRequest, TResponse>(dto: TRequest) => Promise<TResponse>;
    delete: (id?: number) => void;
}
export interface PersistenceOutPort<T, TSave, TUpdate> {
    getAll: () => Promise<T[]>;
    getPage: (pageable: Pageable) => Promise<Page<T>>;
    getById: (pathVariable: string) => Promise<T>;
    save(entity: TSave): Promise<T>;
    update: (dto: TUpdate, id: string) => Promise<T>;
    delete(id: number): void;
}
/*
todo delet
export type getAllUseCase<T> = () => Promise<T[]>;
export type GetByIdUseCase<T> = (id: string | number) => Promise<T>;
export type getPageUseCase<T> = (pageable: Pageable) => Promise<Page<T>>;
export type saveUseCase<TRequest, TResponse> = (entity: TRequest) => Promise<TResponse>;
export type updateUseCase<TRequest, TResponse> = (entity: TRequest) => Promise<TResponse>;
export type deleteUseCase<T> = (id: string | number) => void;
*/