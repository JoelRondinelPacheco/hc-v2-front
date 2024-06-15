import { EntityBase, PageData, Pageable } from "@/domain/commons.domain";
import { MockDB } from "./mock-db";

//misma logica (seria el jpa repo)
//extenderlo?
export class MockRepository<ENTITY extends EntityBase> implements MockDB {
  baseDB: ENTITY[] = [];
  currentId: number = 0;
  //TODO ADD CONSTRUCTOR
  constructor(base: ENTITY[]) {
    this.currentId = base.length;
    this.baseDB = base;
  }

  create(entity: Omit<ENTITY, "id">): ENTITY {
    const newEntity = { ...entity, id: ++this.currentId } as ENTITY;
    this.baseDB.push(newEntity);
    return newEntity;
  }

  getAll(): ENTITY[] {
    return this.baseDB;
  }

  getPage(pageable: Pageable): PageData<ENTITY> {
    //PageData<ENTITY>
    const { pageIndex, pageSize } = pageable;
    const totalItems = this.baseDB.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    const content = this.baseDB.slice(start, end);

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
      pageable: pageable,
    };
  }

  getById(id: number): ENTITY | undefined {
    return this.baseDB.find((entity) => entity.id === id);
  }

  update(updateEntity: ENTITY): ENTITY | undefined {
    const index = this.baseDB.findIndex(
      (entity) => entity.id === updateEntity.id
    );

    if (index !== -1) {
      this.baseDB[index] = { ...updateEntity };
      return this.baseDB[index];
    }

    return undefined;
  }

  delete(id: number): void {}
}
