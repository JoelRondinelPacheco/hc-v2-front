import { NewSaleContextState } from "@/domain/sale.domain";
import newSaleReducer, { NewSaleReducerAction, NewSaleReducerType } from "@/reducers/new-sale.reducer";
import { createContext, useContext, useReducer } from "react";

type NewSaleContextProviderProps = {
    children: React.ReactNode;
}

export type NewSaleContext = {
    state: NewSaleContextState,
    dispatch: React.Dispatch<NewSaleReducerAction>
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
            nationality: "",
            phoneNumber: 0,
            role: {
                id: 0,
                name: ""
            }
        }
    },
    employeeId: 0,
    services: [],
    recordByPage: [],
    totalPrice: 0,
}

const NewSaleContext = createContext<NewSaleContext | null>(null);

export function NewSaleContextProvider({ children }: NewSaleContextProviderProps) {

    const [state, dispatch] = useReducer<NewSaleReducerType>(newSaleReducer, initialState);

    return (
        <NewSaleContext.Provider
        value={{
            state,
            dispatch
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