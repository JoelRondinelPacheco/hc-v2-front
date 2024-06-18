import { Pageable } from "@/domain/commons.domain";
import { NewSaleContextState, RecordPage } from "@/domain/sale.domain";
import { ServiceEntity } from "@/domain/service.domain";
import newSaleReducer, { NewSaleReducerAction, NewSaleReducerType } from "@/reducers/new-sale.reducer";
import { OnChangeFn, RowSelectionState } from "@tanstack/react-table";
import { createContext, useContext, useReducer } from "react";

type NewSaleContextProviderProps = {
    children: React.ReactNode;
}

export type NewSaleContext = {
    state: NewSaleContextState,
    dispatch: React.Dispatch<NewSaleReducerAction>
    getRowSelectionByPage: (pageIndex: number) => Record<string, boolean>,
    onChangeRow: any, //todo cambiar
    currentServicesRowSelection: Record<string, boolean>
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
    currentServicesRowSelection: {}
}

const NewSaleContext = createContext<NewSaleContext | null>(null);

export function NewSaleContextProvider({ children }: NewSaleContextProviderProps) {

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

    //lista de records por pagina
    const getRowSelectionByPage = (pageIndex: number): Record<string, boolean> => {
        console.log(pageIndex)
        let records = state.recordByPage.find((record) => record.pageIndex === pageIndex);
        if (!records) {
            return state.recordByPage[state.recordByPage.length - 1].record
        }
        console.log(records)
        return records.record;
    }

    const serivicesSelectedByPage = (pagination: Pageable, records: Record<string, boolean>, services: ServiceEntity[]): ServiceEntity[] => {
        //ids equivalentes en el record
        let equivalentIds = getListEquivalentIds(records, pagination);
    

        let matching = services.filter(service => equivalentIds.includes(service.id));
        
        return matching;
    }
    //services: [{pageIndex: 0, services: []}],
    //recordByPage: [{pageIndex: 0, record: {}}],
    const updateRowSelection = (pagination: Pageable, records: Record<string, boolean>, services: ServiceEntity[]) => {
        let newRecordByPage: RecordPage = {
            pageIndex: pagination.pageIndex,
            record: records
        }
        let newServices = serivicesSelectedByPage(pagination, records, services);
        dispatch({
            type: "UPDATE_SELECTION",
            payload: {
                recordPage: newRecordByPage,
                services: newServices
            }
        })

    }

    /*
        AL CAMBIAR ROW SELECTION:
            ACTUALIZAR CURRENT ROW SELECTION,
            ACTUALIZAR ALL ROW SELECTION,
            ACTUALIZAR LISTA DE SERVICIOS
    */

    //definir funcion para las rows y pages, que reciba el nuevo valor, o func callback
    const onChangeRow = (rowsUpdater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState), pagination: Pageable, services: ServiceEntity[]) => {
        let old = state.currentServicesRowSelection;
        const newRows = rowsUpdater instanceof Function ? rowsUpdater(old) : rowsUpdater
        dispatch({
            type: "UPDATE_CURRENT_ROW_SELECTION",
            payload: newRows
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
            currentServicesRowSelection: state.currentServicesRowSelection
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