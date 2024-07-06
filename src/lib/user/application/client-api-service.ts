import { ClientEntity, CreateClientRequest } from "@/domain/client.domain";
import { Service } from "@/lib/common/domain/service";
import { EditClientRequest } from "../domain/client.entity";
import { createUseCases } from "@/lib/common/application/use-cases/use-cases";

export const createClientAPIService: Service<ClientEntity, CreateClientRequest, EditClientRequest> = (repository) => createUseCases(repository);