import { AxiosCall } from "@/domain/axios-call.model";
import { GenericCall } from "@/lib/common/domain/call";
import { MockDBResponse } from "@/lib/common/domain/mock-db-response";
import { AxiosResponse } from "axios";

import { useEffect, useState } from "react"

const useFetchAndLoad = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(false);
    let controller: AbortController;

    const callEndpoint = async (call: GenericCall<any>) => {

        if (call.controller) controller = call.controller;

        setLoading(true);

        let result = {} as AxiosResponse<any> | MockDBResponse<any>

        try {
            result = await call.request;
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