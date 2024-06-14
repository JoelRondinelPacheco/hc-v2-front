import { RoleEnum } from "@/domain/auth";
import serviceFactory from "@/domain/http-service/service-factory";

export default function apiServicesService(role: RoleEnum) {
    return serviceFactory(role, "/service");
}