import { GenericCall } from "./call";
import { EntityBase } from "./entity-base";
import { Page, Pageable } from "./pagination";
import { Repository } from "./repository";

export type ServicesActions<T, TSave, TEdit> = {
    getAll: () => GenericCall<T[]>,
    getPage: (pageable: Pageable) => GenericCall<Page<T>>,
    getById: (id: number) => GenericCall<T>,
    save: (entity: TSave) => GenericCall<T>,
    update: (entity: TEdit, id: number) => GenericCall<T>,
    delete: (id: number) => void,
}

export type Service<T, TSave, TEdit, TRepoSave = TSave, TRepoUpdate = TEdit> = (repository: Repository<T, TRepoSave, TRepoUpdate>) => ServicesActions<T, TSave, TEdit>
