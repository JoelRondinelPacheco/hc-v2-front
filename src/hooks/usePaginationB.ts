import { useState } from "react";
import useAsync from "./useAsync"
import useFetchAndLoad from "./useFetchAndLoad";
import useFetchAndLoadB from "./useFetchAndLoadB";
import { GenericCall } from "@/lib/common/domain/call";
import useAsyncB from "./useAyncB";
import { Page, Pageable } from "@/lib/common/domain/pagination";

type UsePaginationType<T> = {
    call: (pageable: Pageable) => GenericCall<Page<T>>,
    initialPage: Pageable
}

const usePaginationB = <T>(props: UsePaginationType<T>) => {
    
    const { call, initialPage } = props;
    const [pagination, setPagination] = useState<Pageable>(initialPage);
    const [pageContent, setPageContent] = useState<T[]>([]);
    const [rowCount, setRowCount] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);


    const { loading, error ,callEndpoint } = useFetchAndLoadB();
    //call endpoint recibe una axiosCall
    //call endpoint retorna el resultado o cancela la peticion
    const getPage = async () => await callEndpoint(call(pagination));
    const onSuccess = (data: any) => {
        setPageContent(data.content)
        setRowCount(data.totalElements)
        setPageCount(data.totalPages)
    }    
    //use async recibe la promesa y la resulve
    //useAsyncB(getPage, setData, () => {}, []);
    useAsyncB(getPage, onSuccess, () => {}, [pagination]);

    return { pageContent, rowCount, pageCount, loading, pagination, setPagination, error }
}

export default usePaginationB