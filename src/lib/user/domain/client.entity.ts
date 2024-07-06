import { EntityBase } from "@/lib/common/domain/entities/entity-base";
import { PersonEntity, PersonInfo } from "./person.entity";

export interface ClientEntity extends EntityBase {
    person: PersonEntity
}

export interface CreateClientRequest extends PersonInfo {
    roleId: number | null,
    password: string | null,
}

export interface UpdateClientRequest extends CreateClientRequest, EntityBase {
    personId: number,
}