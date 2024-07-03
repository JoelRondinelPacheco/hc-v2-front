import { AxiosResponse } from "axios";
import { MockDBResponse } from "./mock-db-response";
import { Page } from "./pagination";

export interface BaseCall {
  controller: AbortController,
}


export interface MockDBCall<T> extends BaseCall {
  request: Promise<MockDBResponse<T>>
}


//Axios no deberia estar en esta capa
export interface GenericCall<T> {
  controller: AbortController,
  request: Promise<MockDBResponse<T | T[] | Page<T>> | AxiosResponse<T | T[] | Page<T>>>
}