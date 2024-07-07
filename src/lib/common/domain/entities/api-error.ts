export type ApiSubError = {
    field: string,
    message: string,
    rejectedValue: any
}

export type ApiError = {
    status: string,
    timestamp: Date,
    message: string,
    backendMessage: string
}

export type ApiErrorValidation = ApiError & {
    subErrors: ApiSubError[]
}