import { OutputMapper } from "@/lib/common/adapter/mapper/mapper";
import { CreateSaleRequest, SaleEntity, UpdateSaleRequest } from "../../domain/sale.domain";

export const createSaleOutputMapper = (): OutputMapper<SaleEntity, CreateSaleRequest, UpdateSaleRequest> => {
    return {
        saveToEntity,
        updateToEntity,
    }
}

const saveToEntity = (dto: CreateSaleRequest, id: number): SaleEntity => {
    throw new Error("Todo impl")
}

const updateToEntity = (dto: UpdateSaleRequest): SaleEntity => {
    throw new Error("Todo impl")
} 