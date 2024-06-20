import { RoleEnum } from "@/domain/auth";
import serviceFactory from "@/domain/utils/service-factory";

export default function saleService(role: RoleEnum) {
    return serviceFactory(role, "/sale")
}