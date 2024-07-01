import { Pageable, Page } from "./pagination";
import { GenericCall } from "./call";


export interface Repository<T, TSaveDTO, TEditDTO> {
    getAll: () => GenericCall<T[]>;
    getPage: (pageable: Pageable) => GenericCall<Page<T>>;
    getById: (pathVariable: string) => GenericCall<T>;
    save(entity: TSaveDTO): GenericCall<T>;
    update: (dto: TEditDTO, id: number) => GenericCall<T>;
    delete(id: number): void;
}


/*
    Builder de mock y api
    InterfazB ok -> API implementa generica, instancia espeficia por tipo
                    Mock implementacion especifica por tipo

    Service interfaz generica?
        -> En infra -> Se tipa con la interfaz. Patron builder para retornar implementacion
*/

export function generateId<T>(t: T[]): number {
    return t.length;
}
/*
 Service recibe el repository, repo implementa interfaz repoI
 "vista/react" recibe interfaz service -> impl de service recibe repo.
    http repo save recibe dto -> backend se encarga
    mock repo save recibe otra cosa, se encarga el mismo, cambia la implementacion,
    pero vista, que usa service, envia lo mismo
    la vista no se entera que cambia repo

    service/serviceImpl -> Tiene que recibir lo mismo, porque se injecta en la vista

    repository/repositoryImpl -> Recibe lo mismo, se injecta en serv y cambia impl
*/