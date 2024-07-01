import { getServiceModule } from "@/lib/common/domain/module";
import { apiRepository } from "@/lib/common/infrastructure/api-repository";
import { CreateServiceRequest, EditServiceRequest, ServiceEntity } from "../domain/service.entity";

export const createServiceAPIRepository = () => apiRepository<ServiceEntity, CreateServiceRequest, EditServiceRequest>(getServiceModule().basePath);