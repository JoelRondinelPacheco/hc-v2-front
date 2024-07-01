import { useState } from 'react';
import useFetchAndLoad from './useFetchAndLoad';
import { Service } from '@/lib/common/domain/service';
import { Repository } from '@/lib/common/domain/repository';

const useUpdate = <REQUEST, EDIT, RESPONSE>(service: Service, repository: Repository<RESPONSE, REQUEST>) => {
  
    const [response, setResponse] = useState<RESPONSE | null>(null);
    const { loading, error, callEndpoint } = useFetchAndLoad();

    async function doUpdate (req: REQUEST, id: number) {
        //let res = await callEndpoint(service(repository).);
        //setResponse(res.data);
    }

    return{ doUpdate, response, loading, error }
}

export default useUpdate