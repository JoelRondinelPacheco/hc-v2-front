import { MockDBResponse } from "@/lib/common/domain/mock-db-response";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const useAsync = (
    asyncFunction: () => Promise<AxiosResponse<any, any> | MockDBResponse<any>>,
    successFunction: Function,
    returnFunction: Function,
    dependencies: any[] = [],
) => {

    useEffect(() => {
        let isActive = true; //inicializacion
            // normal
            asyncFunction().then((res) => {
                if (isActive) successFunction(res.data); //hace la peticion, si sigue activo ejeccuta success
            });
        
    
            return () => {
                returnFunction && returnFunction();
                isActive = false;
            }


    }, dependencies)

}

export default useAsync;