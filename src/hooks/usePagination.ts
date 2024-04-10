import { EntityBase, GenericEntity, PageData, Pageable } from "@/domain/commons.domain"
import { useState } from "react"
import useFetchAndLoad from "./useFetchAndLoad"
import { AxiosCall } from "@/domain/axios-call.model"
import useAsync from "./useAsync"


type UsePaginationProps<T> = {
    intialPage: Pageable,
    call: (pagination: Pageable) => AxiosCall<PageData<T>>,
}

//recibir desde url
const usePagination = <T>(props: UsePaginationProps<T>) => {

    const { intialPage, call } = props;

    const [pagination, setPagination] = useState<Pageable>(intialPage);

    const [pageData, setPageData] = useState<GenericEntity<T>[]>([])  
    const [rowCount, setRowCount] = useState<number>(0)

    const { loading, callEndpoint } = useFetchAndLoad();

    const getPage = async () => await callEndpoint(call(pagination));

    const callSuccess = (data: any) => {
        setPageData(data.content)
        setRowCount(data.totalElements)
    }

    useAsync(getPage, callSuccess, () => {}, [pagination])

    const updateData = (object: GenericEntity<T>) => {
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