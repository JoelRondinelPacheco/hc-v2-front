
import { RepositoryContainer } from "@/lib/common/adapter/utils/repository-factory";
import { ServicesCollection } from "@/lib/common/adapter/utils/use-cases-factory";

export type AuthInfo = {
    email: string,
    password: string,
}

export type RoleEnum = "ADMINISTRATOR" | "ADMINISTRATOR-DEMO" | "EMPLOYEE" | "OWNER" | "EMPLOYEE-DEMO" | "OWNER-DEMO" | "NONE";

export type AuthInfoResponse = {
    role: RoleEnum, 
    name: string,
    email: string,
}

export type AuthInfoResponseWithToken = AuthInfoResponse & {
    authToken: string,
}

export type GlobalContextState = AuthInfoResponse & {
    isLoggedIn: boolean,
    //todo refactorizar any a entidades definidas -> type Entities = CategoryEntity | RoleEntity...
    repository: RepositoryContainer,
    appService: ServicesCollection
}