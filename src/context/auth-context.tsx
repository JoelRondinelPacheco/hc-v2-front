import { AuthContextState } from "@/models/auth";
import authReducer, { AuthReducer, ReducerAction } from "@/reducers/auth-reducer";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextProviderProps = {
    children: React.ReactNode;
}
export type AuthContext = {
    state: AuthContextState,
    dispatch: React.Dispatch<ReducerAction>
}

const AuthContext = createContext<AuthContext | null>(null);

const intialState: AuthContextState = {
    isLoggedIn: false,
    authToken: "",
    role: "NONE",
    name: "",
    email: ""


}

export default function AuthContextProvier ({ children } : AuthContextProviderProps) {

    const [state, dispatch] = useReducer<AuthReducer>(authReducer, intialState);


    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch
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