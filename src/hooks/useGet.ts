import { useState } from "react"
import useFetchAndLoad from "./useFetchAndLoad"
import useAsync from "./useAync"
import { GenericCall } from "@/lib/common/domain/entities/call"
import { GenericEntity } from "@/lib/common/domain/entities/entity-base"


type UsePaginationProps<T> = {
    call: () => GenericCall<T>,
    pathVariable?: string,
}

//recibir desde url
const useGetAll = <T>(props: UsePaginationProps<T>) => {

    const { pathVariable, call } = props;

    const [data, setData] = useState<GenericEntity<T> | null>(null)  
    const { loading, callEndpoint } = useFetchAndLoad();

    const get = async () => await callEndpoint(call());

    const callSuccess = (data: any) => {
        if (data.content) {
            setData(data.content)    
        } else {
        setData(data)
        }
    }

    useAsync(get, callSuccess, () => {}, [])



    return { data, loading }
}

export default useGetAll;