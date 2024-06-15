import { Client } from "@/domain/client.domain";
import { PaymentMethodEntity } from "@/domain/payment-method.domain";
import { NewSaleContextState, RecordPage, ServicesPage } from "@/domain/sale.domain";
import { ServiceEntity } from "@/domain/service.domain";

export type ServicoIndexInfo = {
    indexPage: number,
    indexService: number,
    pageSize: number,
    itemId: number,
    currentPage: number
}

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
    payload: PaymentMethodEntity
}


interface RemoveService {
    type: 'REMOVE_SERVICE'
}

interface RemoveServiceFromButton {
    type: "REMOVE_SERVICE_FROM_BUTTON",
    payload: ServicoIndexInfo
}
export type NewSaleReducerAction = SetClient | SetPaymentMethod | RemoveService | DeleteClient | SetRecordByPage | UpdatetRecordByPage | StarterRecordByPage | UpdatetServicesByPage | UpdatetSelection | SetNewPage | RemoveServiceFromButton

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

        case "REMOVE_SERVICE_FROM_BUTTON":

            let recordIndex: number;
 
                recordIndex = getRecordIndex({
                    itemId: action.payload.itemId,
                    indexPage: action.payload.indexPage,
                    pageSize: action.payload.pageSize,
                    currentPage: action.payload.currentPage
                })
       
    

            console.log(recordIndex)
                console.log(action.payload.currentPage)
            let newServicesArray = state.services.map((service, indexPage) => {
                if (indexPage === action.payload.indexPage) {
                    let arrServices = service.services.filter((service, indexService) => service.id !== action.payload.itemId)
                    return {
                        ...service, services: arrServices
                    }
                } else {
                    return service;
                }
            }
            )
            let newRecordsArray = state.recordByPage.map((record, pageIndex) => {
                if (pageIndex === action.payload.indexPage) {
                    let emptyRecord: Record<string, boolean> = {}
                    for (const key in record.record) {
                     
                        if (key !== String(recordIndex)) {
                            emptyRecord[key] = true;
                        }
                    }

                    return {...record, record: emptyRecord}
                } else {
                    return record;
                }
            })
            console.log(newServicesArray)
            return {...state, services: newServicesArray, recordByPage: newRecordsArray}
        default:
            return {...state};
    }
}
type GetRecordIndexType = {
    itemId: number, indexPage: number, pageSize: number, currentPage: number
}
function getRecordIndex(props: GetRecordIndexType): number {
    const { itemId, indexPage, pageSize, currentPage } = props
    //pageSize: 5, indexPage: 2, itemId: 7

    //recordId: 1
    console.log("id: " + itemId + " item page: " + indexPage +  " current page: " + (currentPage) + " size: " + pageSize)
    let mod = itemId % ((indexPage + 1) * pageSize) //cuanto le falta para el ultmi
     //let res = pageSize - mod - 1

//} else if (itemId === ((indexPage + 1 ) * pageSize)) {

    if (indexPage === currentPage) {
        if ((itemId - 1) === ((currentPage) * pageSize)) {
            return 0;
        } else if (itemId === ((currentPage + 1)* pageSize)) {
            return (pageSize - 1)
        } else {
            return pageSize - (itemId % ((currentPage + 1) * pageSize)) - 1
        }
    } else {
        if ((itemId - 1) === (indexPage)*pageSize) {
            return 0;
        } else if (itemId === (indexPage + 1)* pageSize) {
            return (pageSize - 1);
        } else {
            return pageSize - (itemId % ((indexPage + 1) * pageSize)) - 1
        }
    }

}

export default newSaleReducer;