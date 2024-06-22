import { AxiosCall } from "@/domain/axios-call.model";
import { AxiosResponse } from "axios";

import { useEffect, useState } from "react"

const useFetchAndLoad = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(false);
    let controller: AbortController;

    const callEndpoint = async (axiosCall: AxiosCall<any>) => {

        if (axiosCall.controller) controller = axiosCall.controller;

        setLoading(true);

        let result = {} as AxiosResponse<any>

        try {
            result = await axiosCall.request;
        } catch (e: any) {
            setError(true);
        }

        setLoading(false);
        return result;
    };

    const cancelEndpoint = () => {
        setLoading(false);
        controller && controller.abort;
    }


    useEffect(() => {
        return () => {
            cancelEndpoint();
        }
    }, [])

    return { loading, error, callEndpoint }
}

export default useFetchAndLoad;