import { EntityBase } from "@/lib/common/domain/entities/entity-base";
import { PersonEntity, PersonInfo } from "./person.entity";

export interface ClientEntity extends EntityBase {
    person: PersonEntity
}

export interface CreateClientRequest extends PersonInfo, EntityBase {
    roleId: number | null,
    password: string | null,
    personId: number,
}