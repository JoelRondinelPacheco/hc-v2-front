import { AuthContextState } from "@/domain/auth";

export enum AuthActionTypes {
    LOGIN = 'LOGIN'
}


export interface ReducerAction {
    type: AuthActionTypes;
    payload?: any;
}

export type AuthReducerType = (state: AuthContextState, action: ReducerAction) => AuthContextState

const authReducer: AuthReducerType = (state, action) => {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            return {...action.payload}
        default:
            return state;
    }
}

export default authReducer;