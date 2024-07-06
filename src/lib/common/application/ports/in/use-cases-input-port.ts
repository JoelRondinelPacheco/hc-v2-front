import { EntityBase, Pageable } from "@/domain/commons.domain";
import { GenericCall } from "@/lib/common/domain/entities/call";
import { Page } from "@/lib/common/domain/entities/pagination";

export interface useCases<TDriverDTO extends EntityBase, T extends EntityBase> {
    getAll: () => GenericCall<T[]>;
    getPage: (pageable: Pageable) => GenericCall<Page<T>>;
    getById: (pathVariable: string) => GenericCall<T>;
    save(dto: TDriverDTO): GenericCall<T>;
    update: (dto: TDriverDTO, id: string) => GenericCall<T>;
    delete(id: number): void;
}


//todo updato to generic call
export type getAllUseCase<T> = () => GenericCall<T[]>;
export type GetByIdUseCase<T> = (id: string | number) => GenericCall<T>;
export type getPageUseCase<T> = (pageable: Pageable) => GenericCall<Page<T>>;
export type saveUseCase<TRequest, TResponse> = (entity: TRequest) => GenericCall<TResponse>;
export type updateUseCase<TRequest, TResponse> = (entity: TRequest) => GenericCall<TResponse>;
export type deleteUseCase<T> = (id: string | number) => void;

/*
import { AuthenticatedUser, User } from "../../app/schemas";

export interface ForAuthenticating {
  login: (email: string, password: string) => Promise<AuthenticatedUser>;
  register(user: User, password: string): Promise<AuthenticatedUser>;
}
*/