export interface EntityBase {
    id: number,
}

export type GenericEntity<T> = EntityBase & T;