import { AxiosCall } from '@/domain/axios-call.model'
import React, { useState } from 'react'
import useFetchAndLoad from './useFetchAndLoad'

//const usePostB = <REQUEST, RESPONSE>(axiosCall: AxiosCall<REQUEST>) => {
    const usePostB = <REQUEST, RESPONSE>(axiosCall: ((entity: REQUEST) => AxiosCall<RESPONSE>)) => {
    const [response, setResponse] = useState<RESPONSE | null>(null);
    const [request, setRequest] = useState<REQUEST | null>(null);
    const { loading, error, callEndpoint } = useFetchAndLoad();

    //recibe la llamada,

    //mejor, recibe la call, do post rescibe argumente

    //const doPost = async () => await callEndpoint(axiosCall);
    //retorna la axios call, pero recibe lo que se envia por args

    async function doPost (req: REQUEST) {
        let res = await callEndpoint(axiosCall(req));
        setResponse(res.data);
    }

    return {doPost, response, loading, error }
}

export default usePostB