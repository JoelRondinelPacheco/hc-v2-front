export interface ResponseBase <T> {
    data: T
}

export interface MockDBResponse<T> extends ResponseBase<T>{
    status: number,
    statusText: string
}