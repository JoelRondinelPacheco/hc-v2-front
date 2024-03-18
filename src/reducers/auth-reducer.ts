import { AuthContextState } from "@/models/auth";

export enum ActionTypes {
    LOGIN = 'LOGIN'
}


export interface ReducerAction {
    type: ActionTypes;
    payload?: any;
}

export type AuthReducer = (state: AuthContextState, action: ReducerAction) => AuthContextState

const authReducer: AuthReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return {...action.payload}
        default:
            return state;
    }
}

export default authReducer;