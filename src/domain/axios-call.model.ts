import { AxiosResponse } from "axios";

export interface AxiosCall<T> {
    request: Promise<AxiosResponse<T>>;
    controller: AbortController;
}