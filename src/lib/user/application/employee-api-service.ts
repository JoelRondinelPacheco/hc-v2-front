import { Service } from "@/lib/common/domain/service";
import { CreateEmployeeRequest, EditEmployeeRequest, EmployeeEntity } from "../domain/employee.entity";
import { createAPIUseCases } from "@/lib/common/application/service";

export const createEmployeeAPIService: Service = (repository) => createAPIUseCases(repository);