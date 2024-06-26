import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { AuthContextState, RoleEnum } from "@/domain/auth";
import { HttpService } from "@/domain/http-service/http-service";
import serviceFactory from "@/domain/utils/service-factory";
import authReducer, { AuthReducerType, ReducerAction } from "@/reducers/auth-reducer";
import React, { createContext, useContext, useEffect, useReducer, useState } from "react";


type Theme = "dark" | "light" | "system"
const defaultTheme: Theme = "system";
type AuthContextProviderProps = {
    children: React.ReactNode;
}
export type AuthContext = {
    state: AuthContextState,
    dispatch: React.Dispatch<ReducerAction>,
    role: RoleEnum,
    httpService: HttpService,
    theme: Theme,
    setTheme: (theme: Theme) => void,
    editServiceForm: EditServiceForm,
    setEditServiceForm: React.Dispatch<EditServiceForm>
}

const AuthContext = createContext<AuthContext | null>(null);

const intialState: AuthContextState = {
    isLoggedIn: false,
    authToken: "",
    refreshToken: "",
    role: "NONE",
    name: "",
    email: "",
    httpService: serviceFactory("NONE")
}


/****** SERVICE EDITO ******/
type EditServiceForm = {
    open: boolean,
    name: string,
    description: string,
    price: number
}
/****** SERVICE EDITO ******/
export default function AuthContextProvier ({ children } : AuthContextProviderProps) {

    function initialFunction(initialState: AuthContextState): AuthContextState {
        const storedItems = localStorage.getItem('auth');
        if (storedItems) {
            let items = JSON.parse(storedItems);
            let httpService = serviceFactory(items.role);
            return {...intialState, role: items.role, isLoggedIn: true, httpService: httpService}
        }
        return {...initialState}
    }

    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("theme") as Theme || defaultTheme))
    const [state, dispatch] = useReducer(authReducer, intialState, initialFunction);


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
        <AuthContext.Provider
            value={{
                state,
                dispatch,
                role: state.role,
                httpService: state.httpService,
                theme,
                setTheme,
                editServiceForm,
                setEditServiceForm
            }}
        >
            {children}
            <Toaster />

        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    const context = useContext(AuthContext);
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