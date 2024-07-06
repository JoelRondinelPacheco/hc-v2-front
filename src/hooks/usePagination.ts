import { useState } from "react";
import { GenericCall } from "@/lib/common/domain/entities/call";
import { Page, Pageable } from "@/lib/common/domain/entities/pagination";
import useAsync from "./useAync";
import useFetchAndLoad from "./useFetchAndLoad";
import { GenericEntity } from "@/lib/common/domain/entities/entity-base";

type UsePaginationType<T> = {
    call: (pageable: Pageable) => GenericCall<Page<T>>,
    initialPage: Pageable
}

const usePagination = <T>(props: UsePaginationType<T>) => {
    
    const { call, initialPage } = props;
    const [pagination, setPagination] = useState<Pageable>(initialPage);
    const [pageContent, setPageContent] = useState<GenericEntity<T>[]>([]);
    const [rowCount, setRowCount] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);


    const { loading, error ,callEndpoint } = useFetchAndLoad();
    //call endpoint recibe una axiosCall
    //call endpoint retorna el resultado o cancela la peticion
    const getPage = async () => await callEndpoint(call(pagination));

    const onSuccess = (data: any) => {
        setPageContent(data.content)
        setRowCount(data.totalElements)
        setPageCount(data.totalPages)
    }    

    const updateData = (object: GenericEntity<T>) => {
        
        setPageContent(prev => prev.map((data) => {
                if (data.id === object.id) {
                    return object;
                } else {
                    return data;
                }
            })
        )
    }

    //use async recibe la promesa y la resuelve, y ejecuta la funcion on success
    useAsync(getPage, onSuccess, () => {}, [pagination]);

    return { pageContent, loading, error, rowCount, pageCount, pagination, setPagination, updateData }
}

export default usePagination