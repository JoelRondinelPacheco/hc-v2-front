import { Call } from "./call";
import { MockDBResponse } from "./mock-db-response";


export const mockPromise = <RESPONSE>(r: RESPONSE, controller: AbortController): Promise<MockDBResponse<RESPONSE>> => {
    return new Promise<MockDBResponse<RESPONSE>>((resolve, reject) => {
        setTimeout(() => {
            if (controller.signal.aborted) {
                reject(new Error("Operation aborted"))
            } else {
                const data: RESPONSE = r;
                resolve({
                    data: data,
                    status: 200,
                    statusText: "OK"
                });
            }
                
        }, 500)
    })
}
