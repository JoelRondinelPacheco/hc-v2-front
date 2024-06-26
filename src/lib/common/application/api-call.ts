import { AxiosResponse } from "axios";
import { BaseCall } from "../domain/call";

export interface ApiCall<T> extends BaseCall {
    request: Promise<AxiosResponse<T>>
}