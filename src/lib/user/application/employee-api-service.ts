import { Service } from "@/lib/common/domain/service";
import { CreateEmployeeRequest, EditEmployeeRequest, EmployeeEntity } from "../domain/employee.entity";
import { createUseCases } from "@/lib/common/application/use-cases/use-cases";

export const createEmployeeAPIService: Service = (repository) => createUseCases(repository);