import { PageData, Pageable } from "@/domain/commons.domain"
import { useState } from "react"
import useFetchAndLoad from "./useFetchAndLoad"
import { AxiosResponse } from "axios"
import { AxiosCall } from "@/domain/axios-call.model"
import useAsync from "./useAsync"
import { SourceTextModule } from "vm"

type UsePaginationProps<T> = {
    intialPage: Pageable,
    call: (pagination: Pageable) => AxiosCall<PageData<T>>,
}

//recibir desde url
const usePagination = <T>(props: UsePaginationProps<T>) => {

    const { intialPage, call } = props;

    const [pagination, setPagination] = useState<Pageable>(intialPage);

    const [pageData, setPageData] = useState<T[]>([])  
    const [rowCount, setRowCount] = useState<number>(0)

    const { loading, callEndpoint } = useFetchAndLoad();

    const getPage = async () => await callEndpoint(call(pagination));

    const callSuccess = (data: any) => {
        console.log(data)
        console.log(data.totalElements)
        setPageData(data.content)
        
        setRowCount(data.totalElements)
    }

    useAsync(getPage, callSuccess, () => {}, [pagination])

    const updateData = (object: T) => {
        console.log("en hook")
        console.log(object)
        setPageData(
            pageData.map((data) => {
                if (data.id === object.id) {
                    return object;
                } else {
                    return data;
                }
            })
        )
    }


    return { pagination, setPagination, pageData, rowCount, updateData }
}

export default usePagination;