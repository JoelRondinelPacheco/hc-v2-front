import { AxiosResponse } from "axios";
import { Request } from "../domain/request";


export interface AxiosCall extends Request<AxiosResponse> {
}