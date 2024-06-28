import { EntityBase } from "../../common/domain/entity-base";
import { PersonEntity } from "./person.entity";

export interface EmployeeEntity extends EntityBase {
    person: PersonEntity,
    salary: number
}