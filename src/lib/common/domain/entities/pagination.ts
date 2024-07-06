export interface Pageable {
    pageIndex: number;
    pageSize: number;
}

export interface Page<T> {
    content: T[],
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