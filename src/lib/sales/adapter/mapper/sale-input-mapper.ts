import { InputMapper } from "@/lib/common/adapter/mapper/mapper";
import { CreateSaleRequest, UpdateSaleRequest } from "../../domain/sale.domain";
import { SaleDTO } from "../../application/dto/sale.dto";

export const createSaleInputMapper = (): InputMapper<SaleDTO, CreateSaleRequest, UpdateSaleRequest> => {
    return {
        driverDTOtoSave: saleDTOToSave,
        driverDTOtoUpdate: saleDTOToUpdate
    }
}

export const saleDTOToSave = (dto: SaleDTO): CreateSaleRequest => {
    throw new Error("Todo impl")
}

export const saleDTOToUpdate = (dto: SaleDTO): UpdateSaleRequest => {
    throw new Error("Todo impl")
}