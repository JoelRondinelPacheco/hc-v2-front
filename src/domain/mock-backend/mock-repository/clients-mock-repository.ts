import { Client } from "@/domain/client.domain";
import { MockRepositoryImpl } from "./mock-repository-impl";
import clientsMockData from "../mock-database/clients-mock-db";

export class ClientsMockRepository extends MockRepositoryImpl<Client> {
    constructor() {
        super(clientsMockData());
    }
}