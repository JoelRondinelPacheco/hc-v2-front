import { RoleEnum } from "@/domain/auth";
import serviceFactory from "@/domain/http-service/service-factory";

export interface Entity {
    id: number;
    name: string;
}

export default function usersService(role: RoleEnum) {
    serviceFactory(role, "/users");
}
