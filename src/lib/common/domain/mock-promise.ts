import { Response } from "./response";


export const mockPromise = <RESPONSE>(r: RESPONSE, controller: AbortController): Promise<Response<RESPONSE>> => {
    return new Promise<Response<RESPONSE>>((resolve, reject) => {
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
