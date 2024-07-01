import { GlobalContextState, AuthInfoResponse } from "@/domain/auth"
import { repositoryFactory } from "../utils/repository-factory"

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


export type GlobalReducerAction = LoginFromLocalStorage | Login | Logout

export type GlobalReducerType = (state: GlobalContextState, action: GlobalReducerAction) => GlobalContextState

const globalReducer: GlobalReducerType = (state, action) => {
    switch (action.type) {
        case "LOGIN_FROM_LOCAL_STORAGE":
            return {
                    ...state,
                    authToken: action.payload.auth,
                    role: action.payload.role,
                    isLoggedIn: true,
                    repository: repositoryFactory(action.payload.role),
                }
        case "LOGIN":
            //  localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            localStorage.setItem('auth', JSON.stringify({
                auth: action.payload.authToken,
                role: action.payload.role,
            }));
            return {
                ...state,
                repository: repositoryFactory(action.payload.role),
                isLoggedIn: true,
                authToken: action.payload.authToken,
                refreshToken: action.payload.refreshToken,
                role: action.payload.role,
                name: action.payload.name,
                email: action.payload.email,
            }
        case "LOGOUT":
            localStorage.removeItem('auth');
            return {
                ...state,
                repository: repositoryFactory("NONE"),
                isLoggedIn: false,
                authToken: "",
                refreshToken: "",
                role: "NONE",
                name: "",
                email: "",
            };
        default:
            return {...state};
    }
}

export default globalReducer;