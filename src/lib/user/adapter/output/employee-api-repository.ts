import { apiRepository } from "@/lib/common/adapter/out/http/api-repository";
import { CreateEmployeeRequest, EmployeeEntity, UpdateEmployeeRequest } from "../../domain/employee.entity";
import { getEmployeeModule } from "@/lib/common/domain/module";

export const createEmployeeAPIRepository = () => apiRepository<EmployeeEntity, CreateEmployeeRequest, UpdateEmployeeRequest>(getEmployeeModule().basePath);