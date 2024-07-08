import { EntityBase } from "@/lib/common/domain/entities/entity-base";
import { PersonEntity, PersonInfo } from "./person.entity";

export interface ClientEntity extends EntityBase {
    person: PersonEntity
}

export interface CreateClientRequest extends PersonInfo {}

export interface UpdateClientRequest extends PersonInfo, EntityBase {
    personId: number,
}