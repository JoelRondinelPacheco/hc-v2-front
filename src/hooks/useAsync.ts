import { AxiosResponse } from "axios";
import { useEffect } from "react";

const useAsync = (
    asyncFunction: () => Promise<AxiosResponse<any, any>>,
    successFunction: Function,
    returnFunction: Function,
    dependencies: any[] = [],
) => {

    useEffect(() => {
        let isActive = true;
        asyncFunction().then((res) => {
            if (isActive) successFunction(res.data);
        });

        return () => {
            returnFunction && returnFunction();
            isActive = false;
        }
    }, dependencies)

}

export default useAsync;