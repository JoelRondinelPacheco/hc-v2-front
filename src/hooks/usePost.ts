import { useEffect, useState } from 'react';
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
  const [postData, setPostData] = useState<REQUEST>(initialData)
  const [response, setResponse] = useState<RESPONSE | null>(null);

  const {loading, error , callEndpoint} = useFetchAndLoad();
  /*
    defino function que hace el post, con req y controller
    expongo funcion intermedia 'post' que es la que se va a ejecutar en el componente
*/

//de esta forma, creo var intermedia
    const postF = async (entity: REQUEST) =>  await callEndpoint(call(entity));

//call envia call y
  const postFunction = async () => await callEndpoint(call(postData));

  const callSuccess = (data: any) => {
    setResponse(data);
  }

  useAsync(postFunction, callSuccess, () => {}, [postData], false)

  //post en false para que no se ejecute al cargar
 

  

  return {post: setPostData, error, isLoading: loading, response, setResponse}

}

export default usePost;