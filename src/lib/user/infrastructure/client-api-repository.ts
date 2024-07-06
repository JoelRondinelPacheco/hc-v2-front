import { getClientModule } from "../../common/domain/module";
import { apiRepository } from "../../common/adapter/out/http/api-repository";
import { ClientEntity, CreateClientRequest } from "../domain/client.entity";

export const createClientAPIRepository = () => apiRepository<ClientEntity, CreateClientRequest>(getClientModule().basePath);