import { EmployeeEntity } from "@/domain/client.domain";
import { Service } from "@/lib/common/domain/service";
import { CreateEmployeeRequest, EditEmployeeRequest } from "../domain/employee.entity";
import { createAPIService } from "@/lib/common/application/service";

export const createEmployeeAPIService: Service<EmployeeEntity, CreateEmployeeRequest, EditEmployeeRequest> = (repository) => createAPIService(repository);