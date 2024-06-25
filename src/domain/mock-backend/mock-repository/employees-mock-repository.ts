import { EmployeeEntity } from "@/domain/client.domain";
import { MockRepositoryImpl } from "./mock-repository-impl";
import employeesMockData from "../mock-database/employee-mock-db";


export class EmployeeMockRepository extends MockRepositoryImpl<EmployeeEntity> {

    constructor() {
        super(employeesMockData());
    }
}