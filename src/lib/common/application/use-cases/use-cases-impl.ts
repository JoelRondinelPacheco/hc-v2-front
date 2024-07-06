import { getAllUseCase } from "../ports/in/use-cases-input-port";
import { PersistenceOutPort } from "../ports/out/persistence-out-port";

//Implementa la interfaz de port in, recibe opcionalmente port out
export const r = <T>(repository: any): getAllUseCase<T> => {
    return () => {
        //logica para implementar get all
        return repository.get<T[]>();
    }
}