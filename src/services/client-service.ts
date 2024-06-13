import { RoleEnum } from "@/domain/auth";
import serviceFactory from "@/domain/http-service/service-factory";

export default function clientService(role: RoleEnum) {
    serviceFactory(role, "/client")
}