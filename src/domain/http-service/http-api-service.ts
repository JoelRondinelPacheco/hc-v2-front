import { AxiosCall } from "@/domain/axios-call.model";
import apiClient from "../../services/api-client";
import { Pageable, PageData, QueryParam } from "@/domain/commons.domain";
import { HttpService } from "./http-service";
import { AuthInfo, AuthInfoResponse } from "../auth";

//todo extender todas de esta
/*interface Entity {
    id: number;
}*/

export class HttpAPIService implements HttpService {


    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }
    endpoint: string;

    getAll<T>(): AxiosCall<T[]> {
        const controller = new AbortController();
        const request =  apiClient.get<T[]>(this.endpoint, {
            signal: controller.signal,
        });

        return { request, controller };
    }

    getPageParams<T>(query: QueryParam[]): AxiosCall<PageData<T>> {
        const controller = new AbortController();
        //todo hace en una funcion
        let queryParams: string = "";
        if (query) {
            for (let i = 0; i < query.length; i++) {
                if (i === 0) {
                    queryParams = query[i].key + "=" + query[i].value
                } else {
                    queryParams = queryParams + "&" + query[i].key + "=" + query[i].value
                }
            }
        }
        const request =  apiClient.get<PageData<T>>(
            `${this.endpoint}?${queryParams}`, 
            {
            signal: controller.signal,
            }
        );

        return { request, controller };
    }

    getPage<T>(pageable: Pageable): AxiosCall<PageData<T>> {
        const controller = new AbortController();
        //todo hace en una funcion
        const request =  apiClient.get<PageData<T>>(
            `${this.endpoint}?pageIndex=${pageable.pageIndex}&pageSize=${pageable.pageSize}`, 
            {
            signal: controller.signal,
            }
        );

        return { request, controller };
    }


    getPageQuery<T>(pageable: Pageable, query: string): AxiosCall<PageData<T>> {
        const controller = new AbortController();
        const request =  apiClient.get<PageData<T>>(
            `${this.endpoint}?${query}&pageIndex=${pageable.pageIndex}&pageSize=${pageable.pageSize}`, 
            {
            signal: controller.signal,
            }
        );

        return { request, controller };
    }

    delete(id: number) {
        return apiClient.post(this.endpoint + "/" + id);
    }

    create<REQUEST, RESPONSE>(entity: REQUEST) {
        return apiClient.post<RESPONSE>(this.endpoint, entity);
    }

    update<T extends { id: number }, R>(entity: T) {
        return apiClient.put<R>(this.endpoint + "/" + entity.id, entity);
    }
}

export class AuthService {

    constructor() {
        this.endpoint = "/auth";
    }
    endpoint: string;

    login(body: AuthInfo) {
        return apiClient.post<AuthInfoResponse>(this.endpoint + '/authenticate', body);
    }

    logout(token: string) {
        return apiClient.post<void>(this.endpoint + '/logout', {headers: {"Authorization": "Bearer " + token}})
    }


}