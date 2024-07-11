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
    const { id, clientId, employeeEmail, paymentMethodId, saleItems } = dto;
    return {
        paymentMethodId,
        clientId,
        employeeEmail,
        saleItems
    }
}

export const saleDTOToUpdate = (dto: SaleDTO): UpdateSaleRequest => {
    const { id, clientId, employeeEmail, paymentMethodId, saleItems } = dto;
    return {
        id,
        paymentMethodId,
        clientId,
        employeeEmail,
        saleItems
    }
}