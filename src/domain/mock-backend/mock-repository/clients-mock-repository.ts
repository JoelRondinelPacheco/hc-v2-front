import { ClientEntity } from "@/domain/client.domain";
import { MockRepositoryImpl } from "./mock-repository-impl";
import clientsMockData from "../../../lib/user/infrastructure/clients-mock-db";

export class ClientsMockRepository extends MockRepositoryImpl<ClientEntity> {
    constructor() {
        super(clientsMockData());
    }
}