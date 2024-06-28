import { apiRepository } from "../../common/infrastructure/api-repository";
import { EmployeeEntity } from "../domain/employee.entity";
import { getEmployeeModule } from "../../common/domain/module";

export const createEmployeeAPIRepository = () => apiRepository<EmployeeEntity>(getEmployeeModule().basePath);