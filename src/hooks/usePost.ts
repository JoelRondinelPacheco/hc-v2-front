import { useState } from 'react';
import { AxiosResponse } from 'axios';

type UsePostProps<REQUEST, RESPONSE> = {
    call: (entity: REQUEST) => Promise<AxiosResponse<RESPONSE, any>>
}

const usePost = <REQUEST, RESPONSE>(props: UsePostProps<REQUEST, RESPONSE>) => {

    const { call } = props

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);//todo boolean y message?
  const [data, setData] = useState<RESPONSE | null>(null);

  const post = async (entity: REQUEST) => {
    setIsLoading(true);
    try {
    const res = await call(entity)
    console.log("POST HOOK")
    console.log(res.data)
    console.log(res)
    //todo mapear?
    setData(res.data)
    } catch (e) {
        setError(true)
    } finally {
        setIsLoading(false)
    }
    }


  return { post, data, setData, isLoading, error };
}

export default usePost;