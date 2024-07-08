import { EntityBase } from "../../common/domain/entities/entity-base";
import { PersonEntity, PersonInfo } from "./person.entity";

export interface EmployeeEntity extends EntityBase {
    person: PersonEntity,
    salary: number
}

export interface CreateEmployeeRequest extends PersonInfo {
    salary: number,
}

export interface UpdateEmployeeRequest extends CreateEmployeeRequest, EntityBase {
    personId: number;
}
