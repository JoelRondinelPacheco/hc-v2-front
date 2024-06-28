import React from 'react'
import { AxiosCall } from '@/domain/axios-call.model';
import useFetchAndLoad from './useFetchAndLoad';

const useUpdate = <REQUEST, RESPONSE>(axiosCall: ((entity: REQUEST) => AxiosCall<RESPONSE>)) => {
  
    const { loading, error, callEndpoint } = useFetchAndLoad();
}

export default useUpdate