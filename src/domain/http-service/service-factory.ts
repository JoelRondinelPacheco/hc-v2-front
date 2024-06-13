import { RoleEnum } from "../auth";
import { HttpAPIService } from "./http-api-service";
import { HttpMockService } from "./http-mock-service";

export default function serviceFactory(role: RoleEnum, endpoint: string) {
    if (role === "ADMIN" || role === "OWNER" || role === "EMPLOYEE") {
        return new HttpAPIService(endpoint);
    } else {
        return new HttpMockService(endpoint);
    }
}