import { EntityBase } from "@/lib/common/domain/entity-base";
import { PersonEntity } from "./person.entity";

export interface ClientEntity extends EntityBase {
    id: number,
    person: PersonEntity
}