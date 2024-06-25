import { Response } from "./response";

export interface Request<PROMISE> {
    request: Promise<Response<PROMISE>>;
    controller: AbortController;
}