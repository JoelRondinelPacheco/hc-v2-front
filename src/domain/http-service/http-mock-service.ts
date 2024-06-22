import { AxiosHeaders, AxiosResponse } from 'axios';
import { HttpService } from './http-service';
import { AxiosCall } from '../axios-call.model';
import { EntityBase, PageData, Pageable, QueryParam } from '../commons.domain';
import { mockRepositoryFactory } from '../utils/mock-db-factory';
import { MockRepository } from '../mock-backend/mock-repository/mock-repository';

export class HttpMockService implements HttpService {
    endpoint: string;
    mockRepository: MockRepository;

    constructor(endpoint?: string) {
        const end = endpoint ? endpoint : "";
        this.endpoint = end
        this.mockRepository = mockRepositoryFactory(end);
    }

    setEndpoint(endpoint: string): void {
        this.endpoint = endpoint;
    }

    createMockResponse = <T>(data: T, endpoint?: string): Promise<AxiosResponse<T>> => {
        
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
        });
    }

    getAll<T>(endpoint?: string): AxiosCall<T[]> {
        const mock: MockRepository = endpoint ? mockRepositoryFactory(endpoint) : this.mockRepository;
        const data = mock.getAll();
        const controller = new AbortController();
        const request = new Promise<AxiosResponse>((resolve) => {
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
        });

        return { request, controller };
    }

    getPageParams<T>(query: QueryParam[], endpoint?: string): AxiosCall<PageData<T>> {
        //TODO CAMBIAR pagination?
        const mock: MockRepository = endpoint ? mockRepositoryFactory(endpoint) : this.mockRepository;
        const data = mock.getPage({pageIndex: 0, pageSize: 5});
        const controller = new AbortController();
        const request = new Promise<AxiosResponse>((resolve) => {
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
        });

        return { request, controller };
    }

    getPage<T>(pageable: Pageable, endpoint?: string): AxiosCall<PageData<T>> {
        const mock: MockRepository = endpoint ? mockRepositoryFactory(endpoint) : this.mockRepository;
        const data = mock.getPage(pageable);
        const controller = new AbortController();
        const request = new Promise<AxiosResponse>((resolve) => {
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
        });

        return { 
            request,
            
            controller };
    }

    getPageQuery<T>(pageable: Pageable, query: string, endpoint?: string): AxiosCall<PageData<T>> {
        const mock: MockRepository = endpoint ? mockRepositoryFactory(endpoint) : this.mockRepository;
        const data = mock.getPage(pageable);
        const controller = new AbortController();
        const request = new Promise<AxiosResponse>((resolve) => {
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
        });

        return { request, controller };
    }

    delete(id: number, endpoint?: string): AxiosCall<void> {
        const controller = new AbortController();
        //todo agregar true false?
        this.mockRepository.delete(id);
        const request = new Promise<AxiosResponse>((resolve) => {
            setTimeout(() => {
                resolve({
                    data: null,
                    status: 200,
                    statusText: 'OK',
                    headers: {},
                    config: {
                        headers: new AxiosHeaders()
                    },
                });
            }, 500);
        });

        return { request, controller };
    }

    create<REQUEST, RESPONSE>(entity: REQUEST, endpoint?: string): AxiosCall<RESPONSE> {
        const mock: MockRepository = endpoint ? mockRepositoryFactory(endpoint) : this.mockRepository;
        const data = mock.create(entity);
        const controller = new AbortController();
        const request = new Promise<AxiosResponse>((resolve) => {
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
        });

        return { request, controller };
    }

    update<REQUEST extends EntityBase, RESPONSE>(entity: REQUEST, endpoint?: string): AxiosCall<RESPONSE> {
        const mock: MockRepository = endpoint ? mockRepositoryFactory(endpoint) : this.mockRepository;
        const data = mock.update(entity);
        const controller = new AbortController();
        const request = new Promise<AxiosResponse>((resolve) => {
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
        });
        return { request, controller};
    }

}
