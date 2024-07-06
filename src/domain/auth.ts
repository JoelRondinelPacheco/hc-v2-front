import { HttpService } from "./http-service/http-service";
import { Service } from "../lib/common/domain/service";
import { Repository } from "@/lib/common/domain/repository";
import { RepositoryContainer } from "@/lib/common/adapter/utils/repository-factory";

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

export type GlobalContextState = AuthInfoResponse & {
    isLoggedIn: boolean,
    //todo refactorizar any a entidades definidas -> type Entities = CategoryEntity | RoleEntity...
    repository: RepositoryContainer,
    appService: Service
}