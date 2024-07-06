import { OutputMapper } from "@/lib/common/adapter/mapper/mapper";
import { CreateServiceRequest, ServiceEntity, UpdateServiceRequest } from "../../domain/service.entity";
import { mockRepository } from "@/lib/common/adapter/out/mock-db/mock-repository";

export const createServiceMockRepository = (data: ServiceEntity[], mapper: OutputMapper<ServiceEntity, CreateServiceRequest, UpdateServiceRequest>) => mockRepository(data, mapper);