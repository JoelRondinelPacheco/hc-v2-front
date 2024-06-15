export type AuthInfo = {
    email: string,
    password: string,
}

export type RoleEnum = "ADMIN" | "EMPLOYEE" | "OWNER" | "ADMIN-DEMO" | "EMPLOYEE-DEMO" | "OWNER-DEMO" | "NONE";

export type AuthInfoResponse = {
    authToken: string,
    refreshToken: string,
    role: RoleEnum, 
    name: string,
    email: string,
}

export type AuthContextState = AuthInfoResponse & {
    isLoggedIn: boolean,
    darkMode: boolean
}