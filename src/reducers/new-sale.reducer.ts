import { Client } from "@/domain/client.domain";
import { NewSaleContextState } from "@/domain/sale.domain";
import { ServiceEntity } from "@/domain/service.domain";

export enum NewSaleActionTypes {
    SET_CLIENT = 'SET_CLIENT',
    SET_PAYMENTMETHOD = 'SET_PAYMENTMETHOD',
    ADD_SERVICE = 'ADD_SERVICE',
    REMOVE_SERVICE = 'REMOVE_SERVICE'
}

interface SetClient {
    type: 'SET_CLIENT',
    payload: Client
}


interface SetPaymentMethod {
    type: 'SET_PAYMENT_METHOD',
    payload: ServiceEntity
}

interface AddService {
    type: 'ADD_SERVICE',
    payload: ServiceEntity
}

interface RemoveService {
    type: 'REMOVE_SERVICE'
}

export type NewSaleReducerAction = SetClient | SetPaymentMethod | AddService | RemoveService

export type NewSaleReducerType = (state: NewSaleContextState, action: NewSaleReducerAction) => NewSaleContextState

const newSaleReducer: NewSaleReducerType = (state, action) => {
    switch(action.type) {
        case NewSaleActionTypes.ADD_SERVICE:
            return {...state};
        default:
            return {...state};
    }
}

export default newSaleReducer;