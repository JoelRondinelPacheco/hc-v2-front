import { OutputMapper } from "@/lib/common/adapter/mapper/mapper";
import { CreateSaleRequest, SaleEntity, UpdateSaleRequest } from "../../domain/sale.domain";
import { mockRepository } from "@/lib/common/adapter/out/mock-db/mock-repository";

export const createSaleMockRepository = (data: SaleEntity[], mapper: OutputMapper<SaleEntity, CreateSaleRequest, UpdateSaleRequest>) => mockRepository(data, mapper);