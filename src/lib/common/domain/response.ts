export interface Response<T = any> {
    data: T,
    status: number,
    statusText: string
}