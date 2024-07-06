import { Page, Pageable } from "./entities/pagination";

export const getPageInfo = <T>(pageable: Pageable, data: T[]): Page<T> => {
    const { pageIndex, pageSize } = pageable;
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    const content = data.slice(start, end) as T[];

    return {
      content: content,
      totalElements: totalItems, //de toda la lista TODO impl
      totalPages: totalPages,
      last: false, //TODO impl
      size: pageSize, //num de elementos a mostrar en la pagina, lo especifica el usuario
      number: pageIndex, //es la pagina actual
      numberOfElements: content.length, //elementos encontrados en la pagina actual
      first: false, //TODO impl
      empty: content.length === 0,
      pageable: pageable,
    };
}