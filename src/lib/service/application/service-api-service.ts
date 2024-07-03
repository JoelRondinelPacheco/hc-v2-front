import { Service } from "@/lib/common/domain/service";
import { CreateServiceRequest, EditServiceRequest, ServiceEntity } from "../domain/service.entity";
import { createAPIService } from "@/lib/common/application/service";

export const createServiceAPIService: Service<ServiceEntity, CreateServiceRequest, EditServiceRequest> = (repository) => createAPIService(repository);