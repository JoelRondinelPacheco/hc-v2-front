import { AuthContextState } from "@/domain/auth"

interface Login {
    type: "LOGIN",
    payload: {
        email: string,
    }
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
            if (action.payload.email === "employee@employee.com") {
                return {
                    isLoggedIn: true,
                    authToken: "",
                    role: "EMPLOYEE",
                    name: "Employee Employee",
                    email: "employee@employee.com",
                    darkMode: state.darkMode
                };
            } else if (action.payload.email === "admin@admin.com") {
                return {
                    isLoggedIn: true,
                    authToken: "",
                    role: "ADMIN",
                    name: "Admin Admin",
                    email: "admin@admin.com",
                    darkMode: state.darkMode
                };
            } else if (action.payload.email === "owner@owner.com") {
                return {
                    isLoggedIn: true,
                    authToken: "",
                    role: "OWNER",
                    name: "Owner Owner",
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
            }
            
        case "LOGOUT":
            return {
                isLoggedIn: false,
                authToken: "",
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