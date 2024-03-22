export type EntityBase = {
    id: number
}

export type Pageable = {
    pageIndex: number,
    pageSize: number,
    //offset: number, //posicion del primer elemento que se quiere recuperar de la pagina actual, dejarlo o quitar???
    //pagged: boolean,
    //unpagged: boolean
}

export type PageData<ENTITY> = {
    content: ENTITY[],
    totalElements: number, //de toda la lista
    totalPages: number,
    last: boolean,
    size: number, //num de elementos a mostrar en la pagina, lo especifica el usuario
    number: number, //es la pagina actual
    numberOfElements: number, //elementos encontrados en la pagina actual
    first: boolean,
    empty: boolean,
    pageable: Pageable
}