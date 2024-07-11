import { GlobalContextState, AuthInfoResponse } from "@/lib/common/domain/entities/auth"
import { repositoryFactory } from "@/lib/common/adapter/utils/repository-factory"
import { apiClient } from "@/lib/common/adapter/out/http/api-client"
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

interface ConfigApiClient {
    type: "SET_API_CLIENT_READY",
    payload: boolean
}


export type GlobalReducerAction = LoginFromLocalStorage | ConfigApiClient | Login | Logout

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
        case "SET_API_CLIENT_READY":
            return {
                ...state,
                apiClientReady: action.payload
            }
        case "LOGIN":
            localStorage.setItem('info', JSON.stringify({
                auth: action.payload.name,
                role: action.payload.role,
                email: action.payload.email,
            }));
            const newState=  {
                ...state,
                role: action.payload.role,
                name: action.payload.name,
                email: action.payload.email,
                isLoggedIn: true,
                repository: repositoryFactory(action.payload.role),
                apiClientReady: true,
            }
            return newState;
        case "LOGOUT":
            localStorage.removeItem('info');
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