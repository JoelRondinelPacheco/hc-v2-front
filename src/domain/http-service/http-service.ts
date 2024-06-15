import { AxiosCall } from "../axios-call.model";
import { PageData, Pageable, QueryParam } from "../commons.domain";

export interface HttpService {

    endpoint: string;

    getAll<RESPONSE>(): AxiosCall<RESPONSE[]>

    getPageParams<RESPONSE>(query: QueryParam[]): AxiosCall<PageData<RESPONSE>>

    getPage<RESPONSE>(pageable: Pageable): AxiosCall<PageData<RESPONSE>>

    getPageQuery<RESPONSE>(pageable: Pageable, query: string): AxiosCall<PageData<RESPONSE>>

    delete(id: number): AxiosCall<void>

    create<REQUEST, RESPONSE>(entity: REQUEST): AxiosCall<RESPONSE>;

}