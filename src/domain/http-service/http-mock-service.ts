import { AxiosHeaders, AxiosPromise, AxiosResponse } from 'axios';
import { HttpService } from './http-service';
import { AxiosCall } from '../axios-call.model';
import { PageData, Pageable, QueryParam } from '../commons.domain';

export class HttpMockService implements HttpService<AxiosPromise<any>> {
    endpoint: string;
    private data: any[] = [];

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    private createMockResponse<T>(data: T): AxiosPromise<T> {
        return new Promise<AxiosResponse<T>>((resolve) => {
            setTimeout(() => {
                resolve({
                    data: data,
                    status: 200,
                    statusText: 'OK',
                    headers: {},
                    config: {
                        headers: new AxiosHeaders()
                    },
                });
            }, 500);
        }) as AxiosPromise<T>;
    }

    getAll<T>(): AxiosCall<T[]> {
        const controller = new AbortController();
        const request = this.createMockResponse<T[]>(this.data as T[]);

        return { request, controller };
    }

    getPageParams<T>(query: QueryParam[]): AxiosCall<PageData<T>> {
        const controller = new AbortController();
        const filteredData = this.data.filter(item => {
            return query.every(param => item[param.key] === param.value);
        }) as T[];
        const request = this.createMockResponse<T>(filteredData);

        return { request, controller };
    }

    getPage<T>(pageable: Pageable): AxiosCall<PageData<T>> {
        const controller = new AbortController();
        const start = pageable.pageIndex * pageable.pageSize;
        const end = start + pageable.pageSize;
        const paginatedData = this.data.slice(start, end) as T[];
        const request = this.createMockResponse<T>(paginatedData);

        return { request, controller };
    }

    getPageQuery<T>(pageable: Pageable, query: string): AxiosCall<PageData<T>> {
        const controller = new AbortController();
        const filteredData = this.data.filter(item => {
            return Object.values(item).some(value => value.toString().includes(query));
        }) as T[];
        const start = pageable.page * pageable.size;
        const end = start + pageable.size;
        const paginatedData = filteredData.slice(start, end);
        const request = this.createMockResponse<T[]>(paginatedData);

        return { request, controller };
    }

    delete(id: number): AxiosCall<void> {
        const controller = new AbortController();
        this.data = this.data.filter(item => item.id !== id);
        const request = this.createMockResponse<void>(undefined);

        return { request, controller };
    }

    create<REQUEST, RESPONSE>(entity: REQUEST): AxiosCall<RESPONSE> {
        const controller = new AbortController();
        this.data.push(entity);
        const request = this.createMockResponse<RESPONSE>(entity as unknown as RESPONSE);

        return { request, controller };
    }
}
