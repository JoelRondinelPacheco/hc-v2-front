import { RoleEnum } from "@/domain/auth";
import serviceFactory from "@/domain/http-service/service-factory";

export default function authService(role: RoleEnum) {
    serviceFactory(role, "/auth");
}