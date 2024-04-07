export type AuthInfo = {
    name: string,
    email: string,
}

export type Role = "ADMIN" | "EMPLOYEE" | "OWNER" | "NONE";

export type AuthContextState = {
    isLoggedIn: boolean,
    authToken: string,
    role: Role, 
    name: string,
    email: string,
    darkMode: boolean
}