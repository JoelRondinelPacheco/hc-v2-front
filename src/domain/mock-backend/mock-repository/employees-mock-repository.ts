import { EmployeeEntity } from "@/domain/client.domain";
import { MockRepositoryImpl } from "./mock-repository-impl";
import employeesMockData from "../../../lib/user/infrastructure/employee-mock-db";


export class EmployeeMockRepository extends MockRepositoryImpl<EmployeeEntity> {

    constructor() {
        super(employeesMockData());
    }
}