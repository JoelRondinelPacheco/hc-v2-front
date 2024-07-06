import { Pageable } from "@/domain/commons.domain";
import { GenericCall } from "@/lib/common/domain/entities/call";
import { Page } from "@/lib/common/domain/entities/pagination";

export interface useCases<T, TSaveDTO, TUpdateDTO> {
    getAll: () => GenericCall<T[]>;
    getPage: (pageable: Pageable) => GenericCall<Page<T>>;
    getById: (pathVariable: string) => GenericCall<T>;
    save(entity: TSaveDTO): GenericCall<T>;
    update: (dto: TUpdateDTO, id: string) => GenericCall<T>;
    delete(id: number): void;
}


//todo updato to generic call
export type getAllUseCase<T> = () => Promise<T[]>;
export type GetByIdUseCase<T> = (id: string | number) => Promise<T>;
export type getPageUseCase<T> = (pageable: Pageable) => Promise<Page<T>>;
export type saveUseCase<TRequest, TResponse> = (entity: TRequest) => Promise<TResponse>;
export type updateUseCase<TRequest, TResponse> = (entity: TRequest) => Promise<TResponse>;
export type deleteUseCase<T> = (id: string | number) => void;

/*
import { AuthenticatedUser, User } from "../../app/schemas";

export interface ForAuthenticating {
  login: (email: string, password: string) => Promise<AuthenticatedUser>;
  register(user: User, password: string): Promise<AuthenticatedUser>;
}
*/