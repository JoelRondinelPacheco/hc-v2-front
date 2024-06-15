import { RoleEnum } from "@/domain/auth";
import serviceFactory from "@/domain/utils/service-factory";

export default function apiServicesService(role: RoleEnum) {
    return serviceFactory(role, "/service");
}