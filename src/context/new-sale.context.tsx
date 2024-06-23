import { Pageable } from "@/domain/commons.domain";
import { PaymentMethodEntity } from "@/domain/payment-method.domain";
import { NewSaleContextState, RecordPage, ServicesPage } from "@/domain/sale.domain";
import { ServiceEntity } from "@/domain/service.domain";
import newSaleReducer, { NewSaleReducerAction, NewSaleReducerType } from "@/reducers/new-sale.reducer";
import { PaginationState, RowSelectionState } from "@tanstack/react-table";
import { createContext, useContext, useReducer, useState } from "react";
import { useAuthContext } from "./auth-context";
import serviceFactory from "@/domain/utils/service-factory";
import { HttpService } from "@/domain/http-service/http-service";
import { ClientEntity } from "@/domain/client.domain";

type NewSaleContextProviderProps = {
    children: React.ReactNode;
}

type NewSaleServicesState = {
    services: ServicesPage[],
    serviceRecords: RecordPage[],
    currentServicePageRecord: RecordPage,
    servicesPagination: Pageable //O paginationState de stan table
}

type NewSaleCientsState = {
    client: ClientEntity,
    clientRecords: RecordPage[],
    currentClientPageRecord: RecordPage,
    clientsPagination: Pageable
}

type NewSalePaymentMethodState = {
    paymentMethod: PaymentMethodEntity,
    paymentMethodRecords: RecordPage[],
    paymentMethodPageRecord: RecordPage,
    paymentMethodPagination: Pageable
}

export type NewSaleContext = {
    state: NewSaleContextState,
    dispatch: React.Dispatch<NewSaleReducerAction>
    getRowSelectionByPage: (pageIndex: number) => Record<string, boolean>,
    onChangeRow: any, //todo cambiar
    onChangePagination: any, //todo cambiar
    selectPaymentMethod: any, //todo cambiar
    currentServicesRowSelection: Record<string, boolean>,
    httpService: HttpService
}

const initialState: NewSaleContextState = {
    client: {
        id: 0,
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
    },
    employeeId: 0,
    services: [{pageIndex: 0, services: []}],
    recordByPage: [{pageIndex: 0, record: {}}],
    totalPrice: 0,
    currentServicesRowSelection: {},
    servicesPaginationState: {
        pageIndex: 0,
        pageSize: 5
    },
    paymentMethodSelection: {},
    paymentMethod: {
        id: 0,
        interest: 0,
        type: ""
    },
    done: false
}


const NewSaleContext = createContext<NewSaleContext | null>(null);

export function NewSaleContextProvider({ children }: NewSaleContextProviderProps) {

    
    const { role } = useAuthContext();
    
    const httpService = serviceFactory(role);

    
    //todo agregar reducers por entidad (clientes, servicios, etc)
    const [state, dispatch] = useReducer<NewSaleReducerType>(newSaleReducer, initialState);




    const getEquivalentId = (pageIndex: number, pageSize: number, recordId: number | string): number => {
        let finalId = Number(recordId);
          return pageSize * pageIndex + finalId + 1;
      }
    const getListEquivalentIds = (record: Record<string, boolean>, pageable: Pageable): number[] => {
        let arr: number[] = [];
        for(const id in record) {
            arr.push(getEquivalentId(pageable.pageIndex, pageable.pageSize, id));
        }
        return arr;
    }

    const selectPaymentMethod = (paymentMethodUpdater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState), paymentMethodEntity: PaymentMethodEntity[]) => {
        let old = state.paymentMethodSelection;
        const newPaymentMethodSelection = paymentMethodUpdater instanceof Function ? paymentMethodUpdater(old) : paymentMethodUpdater;
        let paymentMethodEntityFinal = Object.keys(newPaymentMethodSelection).length === 0
                                        ? {
                                            id: 0,
                                            interest: 0,
                                            type: ""
                                        }
                                        : paymentMethodEntity[Number(Object.keys(newPaymentMethodSelection)[0])];

        

        dispatch({
            type: "PAYMENT_METHOD_SELECTION",
            payload: {
                paymentMethodSelection: newPaymentMethodSelection,
                paymentMethod: paymentMethodEntityFinal
            }
        })

    }

    //lista de records por pagina
    const getRowSelectionByPage = (pageIndex: number): Record<string, boolean> => {
        let records = state.recordByPage.find((record) => record.pageIndex === pageIndex);
        if (!records) {
            return state.recordByPage[state.recordByPage.length - 1].record
        }
        return records.record;
    }

    //definir funcion para las rows y pages, que reciba el nuevo valor, o func callback
    const onChangeRow = (rowsUpdater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState), pagination: Pageable, services: ServiceEntity[]) => {
        let old = state.currentServicesRowSelection;
        const newRows = rowsUpdater instanceof Function ? rowsUpdater(old) : rowsUpdater
        dispatch({
            type: "UPDATE_CURRENT_ROW_SELECTION",
            payload: {
                newRecord: newRows,
                services: services,
                pageable: pagination
            }
        })
    }

    const onChangePagination = (paginationUpdater: PaginationState | ((old: PaginationState) => PaginationState)) => {
        let old = state.servicesPaginationState;
        const newPagination = paginationUpdater instanceof Function ? paginationUpdater(old) : paginationUpdater;
        console.log(newPagination)
        /*con la nueva paginacion
            actualizarla desde el dispatch,
            selecionar el row selection actual
        */
       dispatch({
        type: "HANDLE_CHANGE_PAGE",
        payload: newPagination
       })
    }

    //const [state, setState] = useState(in);
    /*
        setState<T>(t: T | (old: T) => T) {
            if (t instanceof Function) {
                //getOldT
                () =>
            } else {
                setT(t)
            }

        }

        t: T
    */

    return (
        <NewSaleContext.Provider
        value={{
            state,
            dispatch,
            getRowSelectionByPage,
            onChangeRow,
            onChangePagination,
            currentServicesRowSelection: state.currentServicesRowSelection,
            selectPaymentMethod,
            httpService
        }}
        >
            {children}
        </NewSaleContext.Provider>
    )
}

export function useNewSaleContext() {
    const context = useContext(NewSaleContext);
    if (!context) {
        throw new Error(
            "Context error message"
        );
    }

    return context;
}