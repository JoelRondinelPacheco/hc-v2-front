import { AxiosCall } from "../axios-call.model";
import { EntityBase, PageData, Pageable, QueryParam } from "../commons.domain";

export interface HttpService {

    endpoint: string;

    setEndpoint(endpoint: string): void

    getAll<RESPONSE>(): AxiosCall<RESPONSE[]>

    getPageParams<RESPONSE>(query: QueryParam[]): AxiosCall<PageData<RESPONSE>>

    getPage<RESPONSE>(pageable: Pageable): AxiosCall<PageData<RESPONSE>>

    getPageQuery<RESPONSE>(pageable: Pageable, query: string): AxiosCall<PageData<RESPONSE>>

    delete(id: number): AxiosCall<void>

    create<REQUEST, RESPONSE>(entity: REQUEST): AxiosCall<RESPONSE>;

    update<REQUEST extends EntityBase, RESPONSE>(entity: REQUEST): AxiosCall<RESPONSE>
    /*
    update<T extends { id: number }, R>(entity: T) {
        const controller = new AbortController();
        const request = apiClient.put<R>(this.endpoint + "/" + entity.id, entity);

        return { request, controller }
    }
    */

}