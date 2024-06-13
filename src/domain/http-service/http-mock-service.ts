import { AuthInfoResponse } from "../auth";
import { AxiosCall } from "../axios-call.model";
import { QueryParam, PageData, Pageable } from "../commons.domain";
import { HttpService } from "./http-service";

export class HttpMockService implements HttpService {
    
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }
    endpoint: string;

    getAll<RESPONSE>(): AxiosCall<RESPONSE[]> {
        throw new Error("Method not implemented.");
    }

    getPageParams<RESPONSE>(query: QueryParam[]): AxiosCall<PageData<RESPONSE>> {
        throw new Error("Method not implemented.");
    }

    getPage<RESPONSE>(pageable: Pageable): AxiosCall<PageData<RESPONSE>> {
        throw new Error("Method not implemented.");
    }
    getPageQuery<RESPONSE>(pageable: Pageable, query: string): AxiosCall<PageData<RESPONSE>> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): void {
        throw new Error("Method not implemented.");
    }
}