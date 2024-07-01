import { CreateClientRequest } from "@/domain/client.domain";
import { getClientModule } from "../../common/domain/module";
import { apiRepository } from "../../common/infrastructure/api-repository";
import { ClientEntity, EditClientRequest } from "../domain/client.entity";

export const createClientAPIRepository = () => apiRepository<ClientEntity, CreateClientRequest, EditClientRequest>(getClientModule().basePath);