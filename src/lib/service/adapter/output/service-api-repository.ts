import { getServiceModule } from "@/lib/common/domain/module";
import { apiRepository } from "@/lib/common/adapter/out/http/api-repository";
import { CreateServiceRequest, ServiceEntity, UpdateServiceRequest } from "../../domain/service.entity";

export const createServiceAPIRepository = () => apiRepository<ServiceEntity, CreateServiceRequest, UpdateServiceRequest>(getServiceModule().basePath);