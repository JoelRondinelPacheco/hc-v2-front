import { RoleEnum } from "@/domain/auth"
import { HttpService } from "@/domain/http-service/http-service"

export type FetchReducerState = {
    httpService: HttpService | null
}

interface SetEndpoint {
    type: "SET_ENDPOINT",
    payload: string
}

interface FetchSource {
    type: "STARTER"
}



export type FetchReducerAction = FetchSource | SetEndpoint
export type FetchSourceReducerType = (fetchState: FetchReducerState, action: FetchReducerAction) => FetchReducerState

const fetchSourceReducer: FetchSourceReducerType = (fetchState: FetchReducerState, action: FetchReducerAction) => {

    if (fetchState.httpService === null) throw Error("Http service not defined");

    switch (action.type) {
        case "SET_ENDPOINT":
            return {...fetchState, httpServices: fetchState.httpService.setEndpoint(action.payload)};
        case "STARTER":
            return {...fetchState}
        default:
            return {...fetchState};
    }
}

export default fetchSourceReducer; 