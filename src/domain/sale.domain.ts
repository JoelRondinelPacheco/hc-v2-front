import { Client } from "./client.domain"
import { ServiceEntity } from "./service.domain"

export type SaleItemDTO = {
    serviceId: number,
    quantity: number,
    from: Date,
    to: Date
}


export type NewSaleDTO = {
    paymentMethodId: number,
    clientId: number,
    employeeId: number,
    saleItems: SaleItemDTO[]
}


export type RecordPage = {
    pageIndex: number;
    record: Record<string, boolean>;
  };

export type ServicesPage = {
    pageIndex: number;
    services: ServiceEntity[]
  };


export type NewSaleContextState = {
    client: Client,
    employeeId: number,
    services: ServicesPage[],
    recordByPage: RecordPage[],
    totalPrice: number,
}