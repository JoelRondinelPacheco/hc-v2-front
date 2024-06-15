import { RoleEnum } from "@/domain/auth";
import serviceFactory from "@/domain/utils/service-factory";

export default function employeeService(role: RoleEnum) {
    serviceFactory(role, "/employee");
}