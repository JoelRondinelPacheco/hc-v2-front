import { getClientModule } from "../../common/domain/module";
import { apiRepository } from "../../common/infrastructure/api-repository";
import { ClientEntity } from "../domain/client.entity";

export const createClientAPIRepository = () => apiRepository<ClientEntity>(getClientModule().basePath);