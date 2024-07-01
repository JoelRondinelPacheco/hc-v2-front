import { mockRepository } from "../../common/infrastructure/mock-repository";
import { ClientEntity } from "../domain/client.entity";
import clientsMockData from "./clients-mock-db";

export const createClientMockRepository = () => mockRepository(clientsMockData());