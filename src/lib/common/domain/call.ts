import { AxiosResponse } from "axios";
import { MockDBResponse } from "./mock-db-response";

export interface BaseCall {
  controller: AbortController,
}


export interface MockDBCall<T> extends BaseCall {
  request: Promise<MockDBResponse<T>>
}


//Axios no deberia estar en esta capa
export interface GenericCall<T> {
  controller: AbortController,
  request: Promise<MockDBResponse<T> | AxiosResponse<T>>
}