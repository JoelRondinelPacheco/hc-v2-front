import { useState } from "react"
import useFetchAndLoad from "./useFetchAndLoad"
import useAsync from "./useAync"
import { GenericCall } from "@/lib/common/domain/call"
import { GenericEntity } from "@/lib/common/domain/entity-base"


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
        setData(data)
    }

    useAsync(get, callSuccess, () => {}, [])



    return { data, loading }
}

export default useGetAll;