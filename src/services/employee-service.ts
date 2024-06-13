import { RoleEnum } from "@/domain/auth";
import serviceFactory from "@/domain/http-service/service-factory";

export default function employeeService(role: RoleEnum) {
    serviceFactory(role, "/employee");
}