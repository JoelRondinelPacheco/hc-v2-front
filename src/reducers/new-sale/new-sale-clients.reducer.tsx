import { NewSaleCientsState } from "@/context/new-sale.context"
import { Pageable } from "@/lib/common/domain/entities/pagination"
import { RecordPage } from "@/lib/sales/domain/sale.domain"
import { ClientEntity } from "@/lib/user/domain/client.entity"



type SelectClientPayload = {
    newRecord: Record<string, boolean>,
    client: ClientEntity[],
    pageable: Pageable
}
interface SelectClient {
    type: "SELECT_CLIENT",
    payload: SelectClientPayload
}

interface RecordsStarter {
    type: "RECORDS_STARTER",
    payload: number
}


interface HandleChangePage {
    type: "CHANGE_PAGE",
    payload: Pageable
}

export type NewSaleClientsReducerAction = RecordsStarter | HandleChangePage | SelectClient

export type NewSaleClientReducerType = (state: NewSaleCientsState, action: NewSaleClientsReducerAction) => NewSaleCientsState

const NewSaleClientsReducer: NewSaleClientReducerType = (state, action) => {
    switch (action.type) {
        case "SELECT_CLIENT":
            //update all pagerecords
            let newClientsRecord = state.clientRecords.map((r) => {
                if (r.pageIndex === action.payload.pageable.pageIndex) {
                    return {
                        pageIndex: r.pageIndex,
                        record: action.payload.newRecord
                    }
                } else {
                    return {pageIndex: r.pageIndex, record: {}};
                }
            })
            const key = Object.keys(action.payload.newRecord)
           
            let newCLient = action.payload.client.find(c => c.id === Number(key[0]));
            if (newCLient === undefined) {
                newCLient = {id: 0,
                    person: {
                        id: 0,
                    name: "",
                    lastname: "",
                    email: "",
                    address: "",
                    dni: 0,
                    birthday: new Date(),
                    phoneNumber: 0,
                    }
                }
            }
            return {
                    ...state,
                    currentClientPageRecord: action.payload.newRecord,
                    client: newCLient,
                    clientRecords: newClientsRecord
                };
        case "CHANGE_PAGE":
            let newCurrentRecord = state.clientRecords[action.payload.pageIndex].record;
            return {
                    ...state,
                    currentClientPageRecord: newCurrentRecord,
                    clientsPagination: {...action.payload}
                    };
        case "RECORDS_STARTER":
            let recordsStarter: RecordPage[] = [];
            for (let i = 0; i < action.payload; i++) {
                recordsStarter.push({pageIndex: i, record: {}})
            }
            return {...state, clientRecords: recordsStarter};
        default:
            return {...state};
    }
}

export default NewSaleClientsReducer;