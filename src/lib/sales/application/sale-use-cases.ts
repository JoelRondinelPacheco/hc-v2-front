import { PersistenceOutPort } from "@/lib/common/application/ports/out/persistence-out-port";
import { CreateSaleRequest, SaleEntity, UpdateSaleRequest } from "../domain/sale.domain";
import { InputMapper } from "@/lib/common/adapter/mapper/mapper";
import { SaleDTO } from "./dto/sale.dto";
import { createUseCases } from "@/lib/common/application/use-cases/use-cases";

export const createSaleUseCases = (
    repository: PersistenceOutPort<SaleEntity, CreateSaleRequest, UpdateSaleRequest>,
    mapper: InputMapper<SaleDTO, CreateSaleRequest, UpdateSaleRequest>
    ) => createUseCases(repository, mapper);