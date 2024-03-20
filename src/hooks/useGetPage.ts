import userService from "@/services/user-service";
import { useEffect, useState } from "react";
import { CanceledError } from "@/services/api-client"
import { AxiosResponse } from "axios";
const useGetPage = <T>(
    getAll: (endpoint: string) => {
        request: Promise<AxiosResponse<T[], any>>;
        cancel: () => void;
    } 
    ) => {
/*
        console.log(getAll)
    const [entity, setEntity] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const {request, cancel} = getAll;

        request
            .then((res) => {
                setEntity(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log("ERRR")
                console.log(err)
                if (err instanceof CanceledError) return;
                setError(err.message);
                setIsLoading(false);
            });

        return () => cancel();
    }, [])

    return { entity, error, isLoading, setEntity, setError }*/
}

export default useGetPage;