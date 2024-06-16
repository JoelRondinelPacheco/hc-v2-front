import { AxiosHeaders, AxiosPromise, AxiosResponse } from 'axios';
import { HttpService } from './http-service';
import { AxiosCall } from '../axios-call.model';
import { PageData, Pageable, QueryParam } from '../commons.domain';
import { mockRepositoryFactory } from '../utils/mock-db-factory';
import { MockRepository } from '../mock-backend/mock-repository/mock-repository';

export class HttpMockService implements HttpService {
    endpoint: string;
    mockRepository: MockRepository;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.mockRepository = mockRepositoryFactory(endpoint);
    }


    //desde aca llamo a los metodos de la db
    //se puede usar con cualquiera
    //depende del endpoint
    //es controller y service a al vez


    //TODO SET ABORTCONTREOLLER TO CREATE MOCK RESPONSE
    private createMockResponse<T>(data: T): Promise<AxiosResponse<T>> {
        
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

    getAll<T>(): AxiosCall<T[]> {
        const data = this.mockRepository.getAll();
        const controller = new AbortController();
        const request = this.createMockResponse<T[]>(data as T[]);

        return { request, controller };
    }

    getPageParams<T>(query: QueryParam[]): AxiosCall<PageData<T>> {
        //TODO CAMBIAR pagination?
        const controller = new AbortController();
        const request = this.createMockResponse(this.mockRepository.getPage({pageIndex: 0, pageSize: 5}));

        return { request, controller };
    }

    getPage<T>(pageable: Pageable): AxiosCall<PageData<T>> {
        const data = this.mockRepository.getPage(pageable);
        const controller = new AbortController();
        const request = this.createMockResponse(data);

        return { request, controller };
    }

    getPageQuery<T>(pageable: Pageable, query: string): AxiosCall<PageData<T>> {
        const controller = new AbortController();
        const request = this.createMockResponse(
            this.mockRepository.getPage(pageable)
        );

        return { request, controller };
    }

    delete(id: number): AxiosCall<void> {
        const controller = new AbortController();
        //todo agregar true false?
        this.mockRepository.delete(id);
        const request = this.createMockResponse<void>(undefined);

        return { request, controller };
    }

    create<REQUEST, RESPONSE>(entity: REQUEST): AxiosCall<RESPONSE> {
        const data = this.mockRepository.create(entity);
        const controller = new AbortController();
        const request = this.createMockResponse<RESPONSE>(data as RESPONSE);

        return { request, controller };
    }
}
