import { GenericCall } from "./entities/call";
import { EntityBase } from "./entities/entity-base";
import { Page, Pageable } from "./entities/pagination";
import { Repository } from "./repository";

export type ServicesActions<T, TUpdateDTO> = {
    getAll: () => GenericCall<T[]>,
    getPage: (pageable: Pageable) => GenericCall<Page<T>>,
    getById: (id: number) => GenericCall<T>,
    save: (entity: TUpdateDTO) => GenericCall<T>,
    update: (entity: TUpdateDTO, id: number) => GenericCall<T>,
    delete: (id: number) => void,
}

export type Service = <T, TUpdateDTO extends EntityBase>(repository: Repository<T, TUpdateDTO>) => ServicesActions<T, TUpdateDTO>
