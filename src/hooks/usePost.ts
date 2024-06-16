import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { AxiosCall } from '@/domain/axios-call.model';
import useFetchAndLoad from './useFetchAndLoad';
import useAsync from './useAsync';

type UsePostProps<REQUEST, RESPONSE> = {
    call: (entity: REQUEST) => AxiosCall<RESPONSE>
    initialData: REQUEST
}

const usePost = <REQUEST, RESPONSE>(props: UsePostProps<REQUEST, RESPONSE>) => {

    const { call, initialData } = props

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);//todo boolean y message?
  const [postData, setPostData] = useState<REQUEST>(initialData)
  const [data, setData] = useState<RESPONSE | null>(null);

  const {loading, callEndpoint} = useFetchAndLoad();

  const post = async () => await callEndpoint(call(postData));

  const callSuccess = (data: any) => {
    setData(data);
  }

  useAsync(post, callSuccess, () => {}, [postData])
/*
  const post = async (entity: REQUEST) => {
    try {
      const res = await postF(entity);
      console.log(res);
    } catch (e) {
      console.log(e)
    }
  }*/
/*
  const post = async (entity: REQUEST) => {
    setIsLoading(true);
    try {
    const res = await call(entity)
    console.log("POST HOOK")
    
    //todo mapear?
    console.log(res)

    console.log(data)
    } catch (e) {
        setError(true)
    } finally {
        setIsLoading(false)
    }
    }*/


  return { post: setPostData, data, setData, isLoading, error };
}

export default usePost;