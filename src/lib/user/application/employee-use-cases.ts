import { PersistenceOutPort } from "@/lib/common/application/ports/out/persistence-out-port";
import { CreateEmployeeRequest, EmployeeEntity, UpdateEmployeeRequest } from "../domain/employee.entity";
import { InputMapper } from "@/lib/common/adapter/mapper/mapper";
import { createUseCases } from "@/lib/common/application/use-cases/use-cases";
import { EmployeeDTO } from "./dto/employee-dto";

export const createEmployeeUseCases = (
    repository: PersistenceOutPort<EmployeeEntity, CreateEmployeeRequest, UpdateEmployeeRequest>,
    mapper: InputMapper<EmployeeDTO, CreateEmployeeRequest, UpdateEmployeeRequest>,
    ) => createUseCases(repository, mapper);