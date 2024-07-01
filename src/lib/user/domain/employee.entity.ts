import { EntityBase } from "../../common/domain/entity-base";
import { PersonEntity, PersonInfo } from "./person.entity";

export interface EmployeeEntity extends EntityBase {
    person: PersonEntity,
    salary: number
}

export interface CreateEmployeeRequest extends PersonInfo {
    salary: number,
    roleId: number,
    password: string,
}

export interface EditEmployeeRequest extends EmployeeEntity{}