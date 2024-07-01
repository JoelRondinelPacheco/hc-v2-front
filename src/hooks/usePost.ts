import React, { useState } from 'react'
import useFetchAndLoad from './useFetchAndLoad';
import { GenericCall } from '@/lib/common/domain/call';


const usePost = <REQUEST, RESPONSE>(call: ((entityasda: REQUEST) => GenericCall<RESPONSE>)) => {
    const [response, setResponse] = useState<RESPONSE | null>(null);
    const { loading, error, callEndpoint } = useFetchAndLoad();

    //recibe la llamada,

    //mejor, recibe la call, do post rescibe argumente

    //const doPost = async () => await callEndpoint(axiosCall);
    //retorna la axios call, pero recibe lo que se envia por args

    async function doPost (req: REQUEST) {
        let res = await callEndpoint(call(req));
        setResponse(res.data);
    }

    return { doPost, response, loading, error }
}

export default usePost