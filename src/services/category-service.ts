import { RoleEnum } from "@/domain/auth";
import serviceFactory from "@/domain/utils/service-factory";

export default function categoryService(role: RoleEnum) {
    return serviceFactory(role, "/category")
}