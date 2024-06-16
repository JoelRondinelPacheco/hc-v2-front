import { EntityBase, GenericEntity, PageData, Pageable, QueryParam } from "@/domain/commons.domain"
import { useEffect, useState } from "react"
import useFetchAndLoad from "./useFetchAndLoad"
import { AxiosCall } from "@/domain/axios-call.model"
import useAsync from "./useAsync"


type UsePaginationProps<T> = {
    call: (queryParams: QueryParam[]) => AxiosCall<PageData<T>>,
    initialQuery: QueryParam[],
}

//recibir desde url
const useGet = <T>(props: UsePaginationProps<T>) => {

    const { initialQuery, call } = props;

    const [queryParams, setQueryParams] = useState<QueryParam[]>(initialQuery);

    const [pageData, setPageData] = useState<GenericEntity<T>[]>([])  
    const [rowCount, setRowCount] = useState<number>(0)

    const { loading, callEndpoint } = useFetchAndLoad();

    const getPage = async () => await callEndpoint(call(queryParams));

    const callSuccess = (data: any) => {
        setPageData(data.content)
        setRowCount(data.totalElements)
    }

    useAsync(getPage, callSuccess, () => {}, [queryParams])

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

    return { queryParams, setQueryParams, pageData, rowCount, updateData }
}

export default useGet;