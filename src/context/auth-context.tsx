import { AuthContextState, RoleEnum } from "@/domain/auth";
import { HttpService } from "@/domain/http-service/http-service";
import serviceFactory from "@/domain/utils/service-factory";
import authReducer, { AuthReducerType, ReducerAction } from "@/reducers/auth-reducer";
import React, { createContext, useContext, useEffect, useReducer } from "react";

type AuthContextProviderProps = {
    children: React.ReactNode;
}
export type AuthContext = {
    state: AuthContextState,
    dispatch: React.Dispatch<ReducerAction>,
    role: RoleEnum,
    httpService: HttpService
}

const AuthContext = createContext<AuthContext | null>(null);

const intialState: AuthContextState = {
    isLoggedIn: false,
    authToken: "",
    refreshToken: "",
    role: "NONE",
    name: "",
    email: "",
    darkMode: true,
    httpService: serviceFactory("NONE")
}

export default function AuthContextProvier ({ children } : AuthContextProviderProps) {

    function initialFunction(initialState: AuthContextState): AuthContextState {
        const storedItems = localStorage.getItem('auth');
        if (storedItems) {
            let items = JSON.parse(storedItems);
            let httpService = serviceFactory(items.role);
            return {...state, role: items.role, isLoggedIn: true, httpService: httpService}
        }
        return {...initialState}
    }

    const [state, dispatch] = useReducer(authReducer, intialState, initialFunction);

    useEffect(() => {
        if (state.darkMode) {
            document.querySelector('html')?.classList.add("dark");
        } else {
            document.querySelector('html')?.classList.remove("dark");
        }

        const storedItems = localStorage.getItem('auth');
        if (storedItems) {
            let i = JSON.parse(storedItems);
            dispatch({
                type: "LOGIN_FROM_LOCAL_STORAGE",
                payload: i
            })
        }
    }, [])


    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch,
                role: state.role,
                httpService: state.httpService
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