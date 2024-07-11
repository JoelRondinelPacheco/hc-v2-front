import { apiRepository } from "@/lib/common/adapter/out/http/api-repository";
import { CreateSaleRequest, SaleEntity, UpdateSaleRequest } from "../../domain/sale.domain";
import { getSaleModule } from "@/lib/common/domain/module";

export const createSaleAPIRepository = () => apiRepository<SaleEntity, CreateSaleRequest, UpdateSaleRequest>(getSaleModule().basePath)