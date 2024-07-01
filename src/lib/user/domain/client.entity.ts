import { EntityBase } from "@/lib/common/domain/entity-base";
import { PersonEntity, PersonInfo } from "./person.entity";

export interface ClientEntity extends EntityBase {
    person: PersonEntity
}

export interface CreateClientRequest extends PersonInfo {
    roleId: number,
    password: string,
}

export interface EditClientRequest extends EntityBase {
    person: PersonEntity
}