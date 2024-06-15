import { RoleEnum } from "@/domain/auth";
import serviceFactory from "@/domain/utils/service-factory";

export default function clientService(role: RoleEnum) {
    serviceFactory(role, "/client")
}