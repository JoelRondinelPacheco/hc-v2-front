import { Pageable } from "@/domain/commons.domain";
import { PaymentMethodEntity } from "@/domain/payment-method.domain";
import { NewSaleContextState, RecordPage, ServicesPage } from "@/domain/sale.domain";
import { ServiceEntity } from "@/domain/service.domain";
import newSaleReducer, { NewSaleReducerAction, NewSaleReducerType } from "@/reducers/new-sale.reducer";
import { PaginationState, RowSelectionState } from "@tanstack/react-table";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useAuthContext } from "./auth-context";
import serviceFactory from "@/domain/utils/service-factory";
import { HttpService } from "@/domain/http-service/http-service";
import { ClientEntity } from "@/domain/client.domain";
import NewSaleClientsReducer, { NewSaleClientsReducerAction } from "@/reducers/new-sale/new-sale-clients.reducer";
import newSaleServicesReducer, { NewSaleServicesReducerAction } from "@/reducers/new-sale/new-sale-services.reducer";

type NewSaleContextProviderProps = {
    children: React.ReactNode;
}

export type NewSaleServicesState = {
    services: ServicesPage[],
    serviceRecords: RecordPage[],
    currentServicePageRecord: Record<string, boolean>,
    servicesPagination: Pageable //O paginationState de stan table
}

const servicesInitialArgs: NewSaleServicesState = {
    services: [{pageIndex: 0, services: []}],
    serviceRecords: [{pageIndex: 0, record: {}}],
    currentServicePageRecord: {},
    servicesPagination: {
        pageIndex: 0,
        pageSize: 5
    }, 
}

export type NewSaleCientsState = {
    client: ClientEntity,
    clientRecords: RecordPage[],
    currentClientPageRecord: Record<string, boolean>,
    clientsPagination: Pageable
}

const clientsInitialArgs: NewSaleCientsState = {
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
    clientRecords: [{pageIndex: 0, record: {}}],
    currentClientPageRecord: {},
    clientsPagination: {
        pageIndex: 0,
        pageSize: 5
    }
}


export type NewSalePaymentMethodState = {
    paymentMethod: PaymentMethodEntity,
    paymentMethodRecords: RecordPage[],
    paymentMethodPageRecord: RecordPage,
    paymentMethodPagination: Pageable
}

export type NewSaleContext = {
    state: NewSaleContextState,
    dispatch: React.Dispatch<NewSaleReducerAction>,
    clientsState: NewSaleCientsState,
    dispatchClients: React.Dispatch<NewSaleClientsReducerAction>,
    servicesState: NewSaleServicesState,
    dispatchServices: React.Dispatch<NewSaleServicesReducerAction>,
    servicesOnChangeRowSelection: any, //todo cambiar
    servicesOnChangePagination: any, //todo cambiar
    selectPaymentMethod: any, //todo cambiar
    httpService: HttpService,
    clientsOnChangePagination: any, //todo cambiar
    clientsOnChangeRowSelection: any, //TODO CAMBIAR
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
    totalPrice: 0,
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

    const [state, dispatch] = useReducer<NewSaleReducerType>(newSaleReducer, initialState);
    const [clientsState, dispatchClients] = useReducer(NewSaleClientsReducer, clientsInitialArgs)
    const [servicesState, dispatchServices] = useReducer(newSaleServicesReducer, servicesInitialArgs);


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
                paymentMethod: paymentMethodEntityFinal,
                services: servicesState.services
            }
        })
    }


    /********** SERVICES **********/

    const servicesOnChangePagination = (paginationUpdater: PaginationState | ((old: PaginationState) => PaginationState)) => {
        let old = servicesState.servicesPagination;
        const newPagination = paginationUpdater instanceof Function ? paginationUpdater(old) : paginationUpdater;
        /*con la nueva paginacion
            actualizarla desde el dispatch,
            selecionar el row selection actual
        */
       dispatchServices({
        type: "CHANGE_PAGE",
        payload: newPagination
       })
    }

    //definir funcion para las rows y pages, que reciba el nuevo valor, o func callback
    const servicesOnChangeRowSelection = (rowsUpdater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState), pagination: Pageable, services: ServiceEntity[]) => {
        let old = servicesState.currentServicePageRecord;
        const newRows = rowsUpdater instanceof Function ? rowsUpdater(old) : rowsUpdater
        console.log(old)
        console.log(newRows)
        dispatchServices({
            type: "SELECT_SERVICE",
            payload: {
                newRecord: newRows,
                services: services,
                pageable: pagination
            }
        })
    }

    /********** SERVICES **********/


    /********** CLIENTS **********/
    const clientsOnChangePagination = (paginationUpdater: PaginationState | ((old: PaginationState) => PaginationState)) => {
        const old = clientsState.clientsPagination;
        const newPagination = paginationUpdater instanceof Function ? paginationUpdater(old) : paginationUpdater;
        
        dispatchClients({
            type: "CHANGE_PAGE",
            payload: newPagination
        })
    }

    const clientsOnChangeRowSelection = (rowsUpdater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState), pageable: Pageable, client: ClientEntity[]) => {
        const old = clientsState.currentClientPageRecord;
        const newSelection = rowsUpdater instanceof Function ? rowsUpdater(old) : rowsUpdater;

        dispatchClients({
            type: "SELECT_CLIENT",
            payload: {
                newRecord: newSelection,
                client: client,
                pageable: pageable
            }
        })
    }
    /********** CLIENTS **********/

    useEffect(() => {
        dispatch({
            type: "SET_PRICE",
            payload: servicesState.services
        })
    }, [servicesState])

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
            clientsState,
            dispatchClients,
            servicesState,
            dispatchServices,
            servicesOnChangeRowSelection,
            servicesOnChangePagination,
            selectPaymentMethod,
            httpService,
            clientsOnChangePagination,
            clientsOnChangeRowSelection
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