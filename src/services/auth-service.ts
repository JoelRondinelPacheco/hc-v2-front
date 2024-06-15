import { RoleEnum } from "@/domain/auth";
import serviceFactory from "@/domain/utils/service-factory";

export default function authService(role: RoleEnum) {
    serviceFactory(role, "/auth");
}