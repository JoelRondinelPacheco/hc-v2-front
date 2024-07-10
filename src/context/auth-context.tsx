import { createContext } from "react";

export type AuthContext = {
    state: string;
}

export const AuthContext = createContext<AuthContext | null>(null);

export default function AuthContextProvider ({ children }: { childre: React.ReactNode }) {
    let state =""

    return(
        <AuthContext.Provider
        value={{
            state
        }}
        >
            { children }
        </AuthContext.Provider>
    )
}