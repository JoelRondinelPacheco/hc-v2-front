import { RoleEnum } from "../auth";
import { HttpAPIService } from "./http-api-service";
import { HttpMockService } from "./http-mock-service";
import { HttpService } from "./http-service";

export default function serviceFactory(role: RoleEnum, endpoint: string): HttpService {
    if (role === "ADMIN" || role === "OWNER" || role === "EMPLOYEE") {
        return new HttpAPIService(endpoint);
    } else {
        return new HttpMockService(endpoint);
    }
}