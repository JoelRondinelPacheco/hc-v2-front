import { ClientEntity } from "@/domain/client.domain";
import { Pageable } from "@/domain/commons.domain";
import { PaymentMethodEntity } from "@/domain/payment-method.domain";
import { NewSaleContextState, RecordPage, ServicesPage } from "@/domain/sale.domain";
import { ServiceEntity } from "@/domain/service.domain";
import { serivicesSelectedByPage } from "./sale-reducer.utils";

export type ServicoIndexInfo = {
    indexPage: number,
    indexService: number,
    itemId: number,
}

type UpdateServicesPayload = {
    pageIndex: number,
    services: ServiceEntity[]
}

type UpdateSelectionPayload = {
    recordPage: RecordPage
    services: ServiceEntity[],
}

type CurrentRowSelectionPayload = {
    newRecord: Record<string, boolean>,
    services: ServiceEntity[],
    pageable: Pageable
}

interface StarterRecordByPage_B {
    type: 'STARTER_RECORD_BY_PAGE_B',
    payload: number
}

interface HandleChangePage {
    type: "HANDLE_CHANGE_PAGE",
    payload: Pageable
}

interface UpdateCurrentRowSelection {
    type: 'UPDATE_CURRENT_ROW_SELECTION',
    payload: CurrentRowSelectionPayload
}

interface SetClient {
    type: 'SET_CLIENT',
    payload: ClientEntity
}

interface DeleteClient {
    type: 'DELETE_CLIENT'
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
export type NewSaleReducerAction = HandleChangePage | UpdateCurrentRowSelection | SetClient | SetPaymentMethod | RemoveService | DeleteClient | StarterRecordByPage_B | UpdatetServicesByPage | UpdatetSelection | SetNewPage | RemoveServiceFromButton

export type NewSaleReducerType = (state: NewSaleContextState, action: NewSaleReducerAction) => NewSaleContextState

const newSaleReducer: NewSaleReducerType = (state, action) => {
    switch(action.type) {
        case "STARTER_RECORD_BY_PAGE_B":
            let recordsStarter: RecordPage[] = [];
            let servicesStarter: ServicesPage[] = [];
            for (let i = 0; i < action.payload ; i++ ) {
                recordsStarter.push({pageIndex: i, record: {}})
                servicesStarter.push({pageIndex: i, services: []})
            }
            return {...state, recordByPage: recordsStarter, services: servicesStarter}
        case "HANDLE_CHANGE_PAGE":
            //new current record
            let newCurrentRecord = state.recordByPage[action.payload.pageIndex].record;
            return {...state, currentServicesRowSelection: newCurrentRecord, servicesPaginationState: {...action.payload}}
        case "UPDATE_CURRENT_ROW_SELECTION":
            const { newRecord, pageable, services} = action.payload
            let newRecordsByPageFinal: RecordPage[] = state.recordByPage.map(
                (r) => r.pageIndex === pageable.pageIndex ? {...r, record: newRecord} : r);
            let newServices = serivicesSelectedByPage(pageable, newRecord, services);
            let newServicesFinal = state.services.map(
                (s) => s.pageIndex === pageable.pageIndex ? {...s,  services: newServices} : s);
            
            return {...state, services: newServicesFinal, recordByPage: newRecordsByPageFinal, currentServicesRowSelection: action.payload.newRecord, totalPrice: calcFinalPrice(newServicesFinal)}
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
        case "SET_NEW_PAGE":
            
            return { ...state,
                services: [...state.services, {pageIndex: action.payload, services: []}],
                recordByPage: [...state.recordByPage, {pageIndex: action.payload, record: {}}]}

        case "REMOVE_SERVICE_FROM_BUTTON":
            let eqRecordId = getEquivalentRecordId(action.payload.indexPage, action.payload.itemId, state.servicesPaginationState);
            let newServicesList: ServicesPage[] = state.services.map((s) => {
                if (s.pageIndex === action.payload.indexPage) {
                    let servicesF = s.services.filter(s => s.id !== action.payload.itemId)
                    return {...s, services: servicesF};                    
                } else {
                    return s;
                }
            })

            let newRecords: RecordPage[] = state.recordByPage.map(r => {
                if (r.pageIndex === action.payload.indexPage) {
                    let filteredRecord: Record<string, boolean> = {}
                    for(const [key, value] of Object.entries(r.record)) {
                        if (key !== eqRecordId.toString()) {
                            filteredRecord[key] = value;
                        }
                    }
                    return {...r, record: filteredRecord};
                } else {
                    return r;
                }
            })
            let finalPrice = calcFinalPrice(newServicesList);

            let finalLocalRed;
            if (state.servicesPaginationState.pageIndex === action.payload.indexPage) {
                finalLocalRed = {...newRecords[action.payload.indexPage].record}
            } else {
                finalLocalRed = state.currentServicesRowSelection
            }

            /*
            vuiejo
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
            console.log(newServicesArray)*/
            return {
                    ...state,
                    services: newServicesList,
                    recordByPage: newRecords,
                    totalPrice: finalPrice,
                    currentServicesRowSelection: finalLocalRed
                
                }
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

function getEquivalentRecordId(indexPage: number, itemId: number, pageable: Pageable) {
    let pageSize = pageable.pageSize;
    let resto = itemId % pageSize;
    if (resto !== 0) {
        return resto - 1;
    } else {
        return pageSize - 1;
    }
}

function calcFinalPrice(services: ServicesPage[]) {
    let price = 0;
    services.forEach((s) => {
        s.services.forEach((serv) => price += serv.price)
    })
    return price;
}

export default newSaleReducer;