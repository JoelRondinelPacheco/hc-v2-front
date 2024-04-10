import { AxiosCall } from "@/domain/axios-call.model";
import { AxiosResponse } from "axios";

import { useEffect, useState } from "react"

const useFetchAndLoad = () => {
    const [loading, setLoading] = useState<boolean>(false);
    //todo error
    let controller: AbortController;

    const callEndpoint = async (axiosCall: AxiosCall<any>) => {
        controller = axiosCall.controller;
        setLoading(true);

        let result = {} as AxiosResponse<any>

        try {
            result = await axiosCall.request;
        } catch (e: any) {

        }

        setLoading(false);
        return result;
    }

    const cancelEndpoint = () => {
        setLoading(false);
        controller && controller.abort;
    }


    useEffect(() => {
        return () => {
            cancelEndpoint();
        }
    })

    return { loading, callEndpoint }
}

export default useFetchAndLoad;