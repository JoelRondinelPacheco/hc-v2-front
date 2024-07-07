import { GenericCall } from "@/lib/common/domain/entities/call";
import { EntityBase } from "@/lib/common/domain/entities/entity-base";
import { Page, Pageable } from "@/lib/common/domain/entities/pagination";

export interface useCases<TDriverDTO extends EntityBase, T extends EntityBase> {
    getAll: () => GenericCall<T[]>;
    getPage: (pageable: Pageable) => GenericCall<Page<T>>;
    getById: (pathVariable: string) => GenericCall<T>;
    save(dto: TDriverDTO): GenericCall<T>;
    update: (dto: TDriverDTO, id: string) => GenericCall<T>;
    delete(id: number): void;
}