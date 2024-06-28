import { GenericCall } from "./call";
import { EntityBase } from "./entity-base";
import { Page, Pageable } from "./pagination";
import { Repository } from "./repository";

export type ServicesActions<T extends EntityBase> = {
    getAll: () => GenericCall<T[]>,
    getPage: (pageable: Pageable) => GenericCall<Page<T>>,
    getById: (id: number) => GenericCall<T>,
    save: (entity: T) => GenericCall<T>,
    delete: (id: number) => void,
}
export type Service = <T extends EntityBase>(repository: Repository<T>) => ServicesActions<T>