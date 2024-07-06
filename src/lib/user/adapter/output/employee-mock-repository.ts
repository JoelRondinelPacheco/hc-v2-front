import { OutputMapper } from "@/lib/common/adapter/mapper/mapper";
import { CreateEmployeeRequest, EmployeeEntity, UpdateEmployeeRequest } from "../../domain/employee.entity";
import { mockRepository } from "@/lib/common/adapter/out/mock-db/mock-repository";

export const createEmployeeMockRepository = (data: EmployeeEntity[], mapper: OutputMapper<EmployeeEntity, CreateEmployeeRequest, UpdateEmployeeRequest>) => mockRepository(data, mapper);