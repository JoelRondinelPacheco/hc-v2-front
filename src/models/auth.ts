export type AuthInfo = {
    name: string,
    email: string,
}



export type AuthContextState = {
    isLoggedIn: boolean,
    authToken: string,
    role: "ADMIN" | "EMPLOYEE" | "OWNER" | "NONE",
    name: string,
    email: string
}