import { apiRepository } from "../../common/adapter/out/http/api-repository";
import { CreateEmployeeRequest, EmployeeEntity } from "../domain/employee.entity";
import { getEmployeeModule } from "../../common/domain/module";

export const createEmployeeAPIRepository = () => apiRepository<EmployeeEntity, CreateEmployeeRequest>(getEmployeeModule().basePath);