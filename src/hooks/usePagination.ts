import { Pageable } from "@/domain/commons.domain"
import { useState } from "react"
import useFetchAndLoad from "./useFetchAndLoad"
import { AxiosResponse } from "axios"
import { AxiosCall } from "@/domain/axios-call.model"
import useAsync from "./useAsync"

type UsePaginationProps = {
    intialPage: Pageable,
    call: AxiosCall<any>,
    dependency: Pageable 
}

//recibir desde url
const usePagination = <T>(props: UsePaginationProps) => {

    const [pageData, setPageData] = useState<T[]>([])

    const { intialPage, call } = props;

    const [pagination, setPagination] = useState<Pageable>(intialPage);

    const { loading, callEndpoint } = useFetchAndLoad();

    const getPage = async () => await callEndpoint(call);

    const callSuccess = (data: any) => {
        setPageData(data.content)
    }

    useAsync(getPage, callSuccess, () => {}, [pagination])



    return { pagination, setPagination, pageData }
}