import { OutputMapper } from "@/lib/common/adapter/mapper/mapper";
import { ClientEntity, CreateClientRequest, UpdateClientRequest } from "../../domain/client.entity";
import { mockRepository } from "@/lib/common/adapter/out/mock-db/mock-repository";

export const createClientMockRepository = (
        data: ClientEntity[],
        mapper: OutputMapper<ClientEntity, CreateClientRequest, UpdateClientRequest>) => mockRepository(data, mapper);