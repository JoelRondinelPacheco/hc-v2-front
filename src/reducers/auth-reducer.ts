import { AuthContextState, AuthInfoResponse } from "@/domain/auth"

interface Login {
    type: "LOGIN",
    payload: AuthInfoResponse | null
}

interface Logout {
    type: "LOGOUT"
}

interface ToggleTheme {
    type: "TOGGLE_THEME"
}

export type ReducerAction = Login | Logout | ToggleTheme

export type AuthReducerType = (state: AuthContextState, action: ReducerAction) => AuthContextState

const authReducer: AuthReducerType = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return action.payload != null 
            ? {
                isLoggedIn: true,
                darkMode: state.darkMode,
                authToken: action.payload.authToken,
                refreshToken: action.payload.refreshToken,
                role: action.payload.role,
                name: action.payload.name,
                email: action.payload.email,
                
            }
            : {...state}
            /*
            if (action.payload.email === "employee@employee.com") {
                return {
                    isLoggedIn: true,
                    authToken: "",
                    role: "EMPLOYEE",
                    name: "Joel Rondinel Pacheco",
                    email: "employee@employee.com",
                    darkMode: state.darkMode
                };
            } else if (action.payload.email === "admin@admin.com") {
                return {
                    isLoggedIn: true,
                    authToken: "",
                    role: "ADMIN",
                    name: "Joel Rondinel Pacheco",
                    email: "admin@admin.com",
                    darkMode: state.darkMode
                };
            } else if (action.payload.email === "owner@owner.com") {
                return {
                    isLoggedIn: true,
                    authToken: "",
                    role: "OWNER",
                    name: "Joel Rondinel Pacheco",
                    email: "owner@owner.com",
                    darkMode: state.darkMode
                };            
            } else {
                return {
                    isLoggedIn: false,
                    authToken: "",
                    role: "NONE",
                    name: "",
                    email: "",
                    darkMode: state.darkMode
                };
            }*/
            
        case "LOGOUT":
            return {
                isLoggedIn: false,
                authToken: "",
                refreshToken: "",
                role: "NONE",
                name: "",
                email: "",
                darkMode: state.darkMode
            };
        case "TOGGLE_THEME":
            let toggleTheme: boolean = !state.darkMode
            return {...state, darkMode: toggleTheme };
        default:
            return state;
    }
}

export default authReducer;