import { AxiosCall } from "@/domain/axios-call.model";
import apiClient from "./api-client";

//todo extender todas de esta
/*interface Entity {
    id: number;
}*/

class HttpService {

    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll<T>(): AxiosCall<T[]> {
        const controller = new AbortController();
        const request =  apiClient.get<T[]>(this.endpoint, {
            signal: controller.signal,
        });

        return { request, controller };
    }

    delete(id: number) {
        return apiClient.post(this.endpoint + "/" + id);
    }

    create<T>(entity: T) {
        return apiClient.post(this.endpoint, entity);
    }

    update<T extends { id: number }>(entity: T) {
        return apiClient.put(this.endpoint + "/" + entity.id, entity);
    }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;