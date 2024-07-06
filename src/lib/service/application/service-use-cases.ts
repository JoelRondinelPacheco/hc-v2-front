import { PersistenceOutPort } from "@/lib/common/application/ports/out/persistence-out-port";
import { CreateServiceRequest, ServiceEntity, UpdateServiceRequest } from "../domain/service.entity";
import { InputMapper } from "@/lib/common/adapter/mapper/mapper";
import { createUseCases } from "@/lib/common/application/use-cases/use-cases";

export const createServiceUseCases = (
    repository: PersistenceOutPort<ServiceEntity, CreateServiceRequest, UpdateServiceRequest>,
    mapper: InputMapper<ServiceEntity, CreateServiceRequest, UpdateServiceRequest>
    ) => createUseCases(repository, mapper);
