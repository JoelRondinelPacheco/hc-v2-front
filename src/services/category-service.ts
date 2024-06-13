import { RoleEnum } from "@/domain/auth";
import serviceFactory from "@/domain/http-service/service-factory";

export default function categoryService(role: RoleEnum) {
    serviceFactory(role, "/category")
}