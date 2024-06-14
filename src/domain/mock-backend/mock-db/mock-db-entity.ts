interface BASE {
    id: number,
}

class MockDBEntity<ENTITY extends BASE> {

    baseDB: ENTITY[] = [];
    currentId: number = 0;
    //TODO ADD CONSTRUCTOR
    constructor(base: ENTITY[]) {
        this.currentId = base.length;
        this.baseDB = base;
    }
    

    create(entity: Omit<ENTITY, 'id'>): ENTITY {
        const newEntity = {...entity, id: ++this.currentId} as ENTITY
        this.baseDB.push(newEntity);
        return newEntity;
    }

    getAll(): ENTITY[] {
        return this.baseDB;
    }

    //todo get page

    getById(id: number): ENTITY | undefined {
        return this.baseDB.find(entity => entity.id === id);
    }

    update(updateEntity: ENTITY): ENTITY | undefined{
        const index = this.baseDB.findIndex(entity => entity.id === updateEntity.id);

        if (index !== -1) {
            this.baseDB[index] = {...updateEntity};
            return this.baseDB[index];
        }

        return undefined;
    }

    //todo delete

}