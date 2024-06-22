import { HttpService } from "./http-service/http-service";

export type AuthInfo = {
    email: string,
    password: string,
}

export type RoleEnum = "ADMINISTRATOR" | "ADMINISTRATOR-DEMO" | "EMPLOYEE" | "OWNER" | "EMPLOYEE-DEMO" | "OWNER-DEMO" | "NONE";

export type AuthInfoResponse = {
    authToken: string,
    refreshToken: string,
    role: RoleEnum, 
    name: string,
    email: string,
}

export type AuthContextState = AuthInfoResponse & {
    isLoggedIn: boolean,
    httpService: HttpService
}