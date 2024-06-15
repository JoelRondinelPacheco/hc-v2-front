import { PageData, Pageable } from "../commons.domain";

export function paginate<T>(array: T[], pageable: Pageable): PageData<T> {
    const { pageIndex, pageSize } = pageable;
    const totalItems = array.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    const content = array.slice(start, end);

    return {
        content: content,
        totalElements: 100, //de toda la lista TODO impl
        totalPages: totalPages,
        last: false, //TODO impl
        size: pageSize, //num de elementos a mostrar en la pagina, lo especifica el usuario
        number: pageIndex, //es la pagina actual
        numberOfElements: content.length, //elementos encontrados en la pagina actual
        first: false, //TODO impl
        empty: content.length === 0,
        pageable: pageable
    };
}
