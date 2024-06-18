import { EntityBase, GenericEntity, PageData, Pageable } from "@/domain/commons.domain"
import { useState } from "react"
import useFetchAndLoad from "./useFetchAndLoad"
import { AxiosCall } from "@/domain/axios-call.model"
import useAsync from "./useAsync"


type UsePaginationProps<T> = {
    initialPage: Pageable,
    call: (pagination: Pageable) => AxiosCall<PageData<T>>,
}

//recibir desde url
const usePagination = <T>(props: UsePaginationProps<T>) => {

    const { initialPage: initialPage, call } = props;

    const [pagination, setPagination] = useState<Pageable>(initialPage);

    const [pageData, setPageData] = useState<GenericEntity<T>[]>([]);
    //todo poner en el mismo estado
    const [rowCount, setRowCount] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);


    const { loading, callEndpoint } = useFetchAndLoad();

    const getPage = async () => await callEndpoint(call(pagination));

    const callSuccess = (data: any) => {
        setPageData(data.content)
        setRowCount(data.totalElements)
        setPageCount(data.totalPages)
    }

    useAsync(getPage, callSuccess, () => {}, [pagination])

    const updateData = (object: GenericEntity<T>) => {
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


    return { pagination, setPagination, pageData, rowCount, pageCount, updateData }
}

export default usePagination;