import { ClientDTO } from "./client-dto";

export type EmployeeDTO = ClientDTO & {
    salary: number
}