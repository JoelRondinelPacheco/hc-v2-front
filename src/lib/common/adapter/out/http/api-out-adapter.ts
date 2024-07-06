import { PersistenceOutPortTEST } from "@/lib/common/application/ports/out/persistence-out-port";
import { GenericCall } from "@/lib/common/domain/entities/call";

export const APIAdapter  = (): PersistenceOutPortTEST => {
    return {
        get: <T>(req: string) => {
            
        },
        update: <TRequest, TResponse>(dto: TRequest) => {
            
        },
        save: <TRequest, TResponse>(entity: TRequest) => {
            
        },
        delete: (id: number) => {
            
        },
    }
}