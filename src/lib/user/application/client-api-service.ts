import { ClientEntity, CreateClientRequest } from "@/domain/client.domain";
import { Service } from "@/lib/common/domain/service";
import { EditClientRequest } from "../domain/client.entity";
import { createAPIService } from "@/lib/common/application/service";

export const createClientAPIService: Service<ClientEntity, CreateClientRequest, EditClientRequest> = (repository) => createAPIService(repository);