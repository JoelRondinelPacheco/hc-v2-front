import { GenericCall } from "@/lib/common/domain/entities/call";
import { Page, Pageable } from "@/lib/common/domain/entities/pagination";

export interface PersistenceOutPort<T, TSave, TUpdate> {
    getAll: () => GenericCall<T[]>;
    getPage: (pageable: Pageable) => GenericCall<Page<T>>;
    getById: (pathVariable: string) => GenericCall<T>;
    save(entity: TSave): GenericCall<T>;
    update: (dto: TUpdate, id: string) => GenericCall<T>;
    delete(id: number): void;
}
