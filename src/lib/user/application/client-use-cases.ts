import { PersistenceOutPort } from "@/lib/common/application/ports/out/persistence-out-port";
import { ClientEntity, CreateClientRequest, UpdateClientRequest } from "../domain/client.entity";
import { createUseCases } from "@/lib/common/application/use-cases/use-cases";
import { InputMapper } from "@/lib/common/adapter/mapper/mapper";
import { ClientDTO } from "./dto/client-dto";

export const createClientUseCases = (
    repository: PersistenceOutPort<ClientEntity, CreateClientRequest, UpdateClientRequest>,
    mapper: InputMapper<ClientDTO, CreateClientRequest, UpdateClientRequest>
    ) => createUseCases(repository, mapper);