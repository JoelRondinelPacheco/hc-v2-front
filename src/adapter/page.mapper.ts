import { PageData } from "@/domain/commons.domain";

export interface PageMapper<T> {
    apiToDomainPage(data: any): PageData<T> 
}