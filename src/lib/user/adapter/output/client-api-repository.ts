import { apiRepository } from "@/lib/common/adapter/out/http/api-repository";
import { ClientEntity, CreateClientRequest, UpdateClientRequest } from "../../domain/client.entity";
import { getClientModule } from "@/lib/common/domain/module";

export const createClientAPIRepository = () => apiRepository<ClientEntity, CreateClientRequest, UpdateClientRequest>(getClientModule().basePath);