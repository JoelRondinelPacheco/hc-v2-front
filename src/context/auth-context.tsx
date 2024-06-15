import { AuthContextState, RoleEnum } from "@/domain/auth";
import authReducer, { AuthReducerType, ReducerAction } from "@/reducers/auth-reducer";
import React, { createContext, useContext, useEffect, useReducer } from "react";

type AuthContextProviderProps = {
    children: React.ReactNode;
}
export type AuthContext = {
    state: AuthContextState,
    dispatch: React.Dispatch<ReducerAction>,
    role: RoleEnum
}

const AuthContext = createContext<AuthContext | null>(null);

const intialState: AuthContextState = {
    isLoggedIn: false,
    authToken: "",
    refreshToken: "",
    role: "NONE",
    name: "",
    email: "",
    darkMode: true
}

export default function AuthContextProvier ({ children } : AuthContextProviderProps) {

    const [state, dispatch] = useReducer<AuthReducerType>(authReducer, intialState);

    useEffect(() => {
        if (state.darkMode) {
            document.querySelector('html')?.classList.add("dark");
        } else {
            document.querySelector('html')?.classList.remove("dark");
        }
    })


    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch,
                role: state.role
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            "Context error message"
        );
    }
    return context;
}

/*
En un componente
const { auth, setAuth } = useAuthContext();
*/