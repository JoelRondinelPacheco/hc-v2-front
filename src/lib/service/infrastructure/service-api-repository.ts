import { getServiceModule } from "@/lib/common/domain/module";
import { apiRepository } from "@/lib/common/infrastructure/api-repository";
import { CreateServiceRequest, ServiceEntity } from "../domain/service.entity";

export const createServiceAPIRepository = () => apiRepository<ServiceEntity, CreateServiceRequest>(getServiceModule().basePath);