import React from 'react'
import useFetchAndLoad from './useFetchAndLoad'
import { AxiosCall } from '@/domain/axios-call.model';

const useUpdate = <REQUEST, RESPONSE>(axiosCall: ((entity: REQUEST) => AxiosCall<RESPONSE>)) => {
  
    const { loading, error, callEndpoint } = useFetchAndLoad();
}

export default useUpdate