import { mockRepository } from "../../common/infrastructure/mock-repository";
import employeesMockData from "./employee-mock-db";


export const createEmployeeMockRepository = () => mockRepository(employeesMockData());