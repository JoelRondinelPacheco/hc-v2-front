import { AxiosResponse } from "axios";
import { BaseCall } from "../domain/entities/call";

export interface ApiCall<T> extends BaseCall {
    request: Promise<AxiosResponse<T>>
}