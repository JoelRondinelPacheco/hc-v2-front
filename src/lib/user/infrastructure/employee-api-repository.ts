import { apiRepository } from "../../common/infrastructure/api-repository";
import { CreateEmployeeRequest, EditEmployeeRequest, EmployeeEntity } from "../domain/employee.entity";
import { getEmployeeModule } from "../../common/domain/module";

export const createEmployeeAPIRepository = () => apiRepository<EmployeeEntity, CreateEmployeeRequest, EditEmployeeRequest>(getEmployeeModule().basePath);