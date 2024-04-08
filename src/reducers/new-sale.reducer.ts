import { Client } from "@/domain/client.domain";
import { PaymentMethod } from "@/domain/payment-method.domain";
import { NewSaleContextState } from "@/domain/sale.domain";
import { ServiceEntity } from "@/domain/service.domain";

interface SetClient {
    type: 'SET_CLIENT',
    payload: Client
}

interface DeleteClient {
    type: 'DELETE_CLIENT'
}


interface SetPaymentMethod {
    type: 'SET_PAYMENT_METHOD',
    payload: PaymentMethod
}

interface AddService {
    type: 'ADD_SERVICE',
    payload: ServiceEntity[]
}

interface RemoveService {
    type: 'REMOVE_SERVICE'
}

export type NewSaleReducerAction = SetClient | SetPaymentMethod | AddService | RemoveService | DeleteClient

export type NewSaleReducerType = (state: NewSaleContextState, action: NewSaleReducerAction) => NewSaleContextState

const newSaleReducer: NewSaleReducerType = (state, action) => {
    switch(action.type) {
        case "SET_CLIENT":
            return {...state, client: action.payload};
        case "DELETE_CLIENT":
            return {...state, client: {
                id: 0,
                person: {
                    id: 0,
                    name: "",
                    lastname: "",
                    email: "",
                    address: "",
                    dni: 0,
                    birthday: new Date(),
                    nationality: "",
                    phoneNumber: 0,
                    role: {
                        id: 0,
                        name: ""
                    }
                }
            }}
        case "ADD_SERVICE":
            return {...state, services: action.payload}
        default:
            return {...state};
    }
}

export default newSaleReducer;