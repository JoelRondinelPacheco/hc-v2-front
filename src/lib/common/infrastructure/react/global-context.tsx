import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { GlobalContextState as GlobalContextState, RoleEnum } from "@/domain/auth";
import globalReducer, { GlobalReducerType, GlobalReducerAction } from "@/lib/common/infrastructure/react/auth-reducer";
import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { RepositoryContainer, repositoryFactory } from "../utils/repository-factory";
import { Service } from "../../domain/service";
import serviceFactory from "@/domain/utils/service-factory";
import { createService } from "../utils/services-factory";


type Theme = "dark" | "light" | "system"
const defaultTheme: Theme = "system";
type GlobalContextProviderProps = {
    children: React.ReactNode;
}
export type GlobalContext = {
    state: GlobalContextState,
    dispatch: React.Dispatch<GlobalReducerAction>,
    role: RoleEnum,
    service: Service,
    repository: RepositoryContainer
    theme: Theme,
    setTheme: (theme: Theme) => void,
    editServiceForm: EditServiceForm,
    setEditServiceForm: React.Dispatch<EditServiceForm>,
}

export const GlobalContext = createContext<GlobalContext | null>(null);

const intialState: GlobalContextState = {
    isLoggedIn: false,
    authToken: "",
    refreshToken: "",
    role: "NONE",
    name: "",
    email: "",
    repository: repositoryFactory("NONE"),
    appService: createService,
}


/****** SERVICE EDITO ******/
type EditServiceForm = {
    open: boolean,
    name: string,
    description: string,
    price: number
}
/****** SERVICE EDITO ******/

//contex que consuma casos de uso
//crea repo primero
/*
const repository = createCategoryMockRepository();
const repoApi = createCategoryAPIRepository();
const service = createCategoryService(repository);*/

export default function GlobalContextProvider ({ children } : GlobalContextProviderProps) {


    function initialFunction(initialState: GlobalContextState): GlobalContextState {
        const storedItems = localStorage.getItem('auth');
        if (storedItems) {
            let items = JSON.parse(storedItems);
            //llamar al servicio?, crear el repo segun argumentos en el servicio?
            let repo = repositoryFactory(items.role);
            return {
                    ...intialState,
                    role: items.role,
                    isLoggedIn: true,
                    repository: repo,
                }
        }
        return {...initialState}
    }

    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("theme") as Theme || defaultTheme))
    const [state, dispatch] = useReducer(globalReducer, intialState, initialFunction);

    //services segun el rol, segun url
    /****** SERVICE EDITO ******/
    const [editServiceForm, setEditServiceForm] = useState<EditServiceForm>({
        open: false,
        name: "",
        description: "",
        price: 0

    })

    /****** SERVICE EDITO ******/

    const { toast } = useToast();
    const categoryToastOk = () => toast({
        title: "Categoria editada correctamente"
    });
    const categoryToastError = () => toast({
        title: "Error al editar la categoria",
        variant: "destructive"
    });

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")
        
        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
              .matches
              ? "dark"
              : "light"
       
            root.classList.add(systemTheme)
            return
          }
       
          root.classList.add(theme)
    }, [theme])


    return (
        <GlobalContext.Provider
            value={{
                state,
                dispatch,
                role: state.role,
                theme,
                setTheme,
                editServiceForm,
                setEditServiceForm,
                service: state.appService,
                repository: state.repository

            }}
        >
            
            {children}
            <Toaster />

        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error(
            "Context error message"
        );
    }
    return context;
}

/*
En un componente
const { auth, setAuth } = useAuthContext();
*/