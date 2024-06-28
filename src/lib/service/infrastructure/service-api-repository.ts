import { ServiceEntity } from "@/domain/service.domain";
import { getServiceModule } from "@/lib/common/domain/module";
import { apiRepository } from "@/lib/common/infrastructure/api-repository";

export const createServiceAPIRepository = () => apiRepository<ServiceEntity>(getServiceModule().basePath);