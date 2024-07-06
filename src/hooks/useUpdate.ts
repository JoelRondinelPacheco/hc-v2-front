import { useState } from 'react';
import useFetchAndLoad from './useFetchAndLoad';
import { GenericCall } from '@/lib/common/domain/entities/call';

const useUpdate = <REQUEST, RESPONSE>(call: ((entity: REQUEST, id: number) => GenericCall<RESPONSE>)) => {
  
    const [response, setResponse] = useState<RESPONSE | null>(null);
    const { loading, error, callEndpoint } = useFetchAndLoad();

    async function doUpdate (req: REQUEST, id: number) {
        let res = await callEndpoint(call(req, id));
        setResponse(res.data);
    }

    return{ doUpdate, response, loading, error }
}

export default useUpdate