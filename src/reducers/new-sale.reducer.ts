import { Client } from "@/domain/client.domain";
import { Pageable } from "@/domain/commons.domain";
import { PaymentMethod } from "@/domain/payment-method.domain";
import { NewSaleContextState, RecordPage, ServicesPage } from "@/domain/sale.domain";
import { ServiceEntity } from "@/domain/service.domain";

type UpdateServicesPayload = {
    pageIndex: number,
    services: ServiceEntity[]
}

type UpdateSelectionPayload = {
    pageIndex: number,
    services: ServiceEntity[],
    record:  Record<string, boolean>
}

interface SetClient {
    type: 'SET_CLIENT',
    payload: Client
}

interface DeleteClient {
    type: 'DELETE_CLIENT'
}

interface SetRecordByPage {
    type: 'SET_RECORD_BY_PAGE',
    payload: RecordPage
}

interface StarterRecordByPage {
    type: 'STARTER_RECORD_BY_PAGE',
    payload: number
}

interface UpdatetRecordByPage {
    type: 'UPDATE_RECORD_BY_PAGE',
    //recibir el index para actualizar el record, el index con los nuevos servicios en ese index
    payload: RecordPage
}

interface UpdatetSelection {
    type: 'UPDATE_SELECTION',
    //recibir el index para actualizar el record, el index con los nuevos servicios en ese index
    payload: UpdateSelectionPayload
}

interface SetNewPage {
    type: 'SET_NEW_PAGE',
    payload: number
}

interface UpdatetServicesByPage {
    type: 'UPDATE_SERVICES_BY_PAGE',
    //recibir el index para actualizar el record, el index con los nuevos servicios en ese index
    payload: UpdateServicesPayload
}

interface SetPaymentMethod {
    type: 'SET_PAYMENT_METHOD',
    payload: PaymentMethod
}


interface RemoveService {
    type: 'REMOVE_SERVICE'
}

export type NewSaleReducerAction = SetClient | SetPaymentMethod | RemoveService | DeleteClient | SetRecordByPage | UpdatetRecordByPage | StarterRecordByPage | UpdatetServicesByPage | UpdatetSelection | SetNewPage

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
        case "STARTER_RECORD_BY_PAGE":
            let nestate= {...state,
                recordByPage: [{pageIndex: action.payload, record: {}}],
                services: [{pageIndex: action.payload, services: []}]}
                console.log(nestate)
            return nestate;
        case "SET_RECORD_BY_PAGE":
            state.recordByPage.push(action.payload)
            return {...state, recordByPage: [...state.recordByPage]}
        case "UPDATE_RECORD_BY_PAGE":
            let newRecord: RecordPage[] = state.recordByPage.map((record) => {
                if (record.pageIndex === action.payload.pageIndex) {
                    return { pageIndex: action.payload.pageIndex, record: action.payload.record};
                } else {
                    return record;
                }
            })
            return {...state, recordByPage: [...newRecord]}
        case "UPDATE_SERVICES_BY_PAGE":
            let newServices: ServicesPage[] = state.services.map((service) => {
                if (service.pageIndex === action.payload.pageIndex) {
                    return { pageIndex: action.payload.pageIndex, services: action.payload.services};
                } else {
                    return service;
                }
            })

            let newTotalPrice: number = 0;

            newServices.forEach((servicePage) => {
                servicePage.services.forEach((service) => {
                    newTotalPrice += service.price;
                })
            })

            return {...state, services: newServices, totalPrice: newTotalPrice}
        case "UPDATE_SELECTION":

            //cuando entra en pagina nueva no lo agrega, porque en los servicios no lo encutra,
            //CREAR SERVICIO VACIO ALK ENTRAR EN PAGINA NUEVA
            let newServicesB: ServicesPage[] = state.services.map((service) => {
                if (service.pageIndex === action.payload.pageIndex) {
                    return { pageIndex: action.payload.pageIndex, services: action.payload.services};
                } else {
                    return service;
                }
            })

            //ver si existen servicios con ese index

            let newRecordB: RecordPage[] = state.recordByPage.map((record) => {
                if (record.pageIndex === action.payload.pageIndex) {
                    return { pageIndex: action.payload.pageIndex, record: action.payload.record};
                } else {
                    return record;
                }
            })
            let newTotalPriceB: number = 0;

            newServicesB.forEach((servicePage) => {
                servicePage.services.forEach((service) => {
                    newTotalPriceB += service.price;
                })
            })

            return { ...state, services: newServicesB, recordByPage: newRecordB, totalPrice: newTotalPriceB}
        case "SET_NEW_PAGE":
            return { ...state,
                    services: [...state.services, {pageIndex: action.payload, services: []}],
                    recordByPage: [...state.recordByPage, {pageIndex: action.payload, record: {}}]}
        default:
            return {...state};
    }
}

export default newSaleReducer;