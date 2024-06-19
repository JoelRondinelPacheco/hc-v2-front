import { AuthContextState, AuthInfoResponse } from "@/domain/auth"

interface Login {
    type: "LOGIN",
    payload: AuthInfoResponse
}

interface LoginFromLocalStorage {
    type: "LOGIN_FROM_LOCAL_STORAGE",
    payload: any
}

interface Logout {
    type: "LOGOUT"
}

interface ToggleTheme {
    type: "TOGGLE_THEME"
}

export type ReducerAction = LoginFromLocalStorage | Login | Logout | ToggleTheme

export type AuthReducerType = (state: AuthContextState, action: ReducerAction) => AuthContextState

const authReducer: AuthReducerType = (state, action) => {
    switch (action.type) {
        case "LOGIN_FROM_LOCAL_STORAGE":
            return {...state, authToken: action.payload.auth, role: action.payload.role, isLoggedIn: true}
        case "LOGIN":
            //  localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            localStorage.setItem('auth', JSON.stringify({
                auth: action.payload.authToken,
                role: action.payload.role,
            }));
            localStorage.setItem
            return {
                isLoggedIn: true,
                darkMode: state.darkMode,
                authToken: action.payload.authToken,
                refreshToken: action.payload.refreshToken,
                role: action.payload.role,
                name: action.payload.name,
                email: action.payload.email,
                
            }
        case "LOGOUT":
            localStorage.removeItem('auth');
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