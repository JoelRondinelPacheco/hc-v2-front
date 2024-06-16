import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const useAsync = (
    asyncFunction: () => Promise<AxiosResponse<any, any>>,
    successFunction: Function,
    returnFunction: Function,
    dependencies: any[] = [],
    doFirstRun: boolean = true
) => {

    const [isFirstRun, setIsFirstRun] = useState(doFirstRun);

    useEffect(() => {
        let isActive = true;
        if (isFirstRun) { //primer -> true, siempre true se hace como siempre
            // normal
            asyncFunction().then((res) => {
                if (isActive) successFunction(res.data);
            });
        
    
            return () => {
                returnFunction && returnFunction();
                isActive = false;
            }
        
        } else { // primer -> false, cambiar a true, en los siguientes se ejecuta solo el primero
            setIsFirstRun(true);
            return;
        }

    }, dependencies)

}

export default useAsync;