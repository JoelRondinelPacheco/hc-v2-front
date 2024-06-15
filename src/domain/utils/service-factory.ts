import { RoleEnum } from "../auth";
import { HttpAPIService } from "../http-service/http-api-service";
import { HttpMockService } from "../http-service/http-mock-service";
import { HttpService } from "../http-service/http-service";

export default function serviceFactory(role: RoleEnum, endpoint: string): HttpService<any> {
    if (role === "ADMIN" || role === "OWNER" || role === "EMPLOYEE") {
        return new HttpAPIService(endpoint);
    } else {
        return new HttpMockService(endpoint);
    }
}