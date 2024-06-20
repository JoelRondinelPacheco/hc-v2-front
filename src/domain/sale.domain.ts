import { PaginationState } from "@tanstack/react-table"
import { ClientEntity, EmployeeEntity } from "./client.domain"
import { EntityBase } from "./commons.domain"
import { ServiceEntity } from "./service.domain"
import { PaymentMethodEntity } from "./payment-method.domain"


//post
export type SaleItemDTO = {
    serviceId: number,
    quantity: number,
    from: Date,
    to: Date
}

//post
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
    client: ClientEntity,
    employeeId: number,
    services: ServicesPage[],
    recordByPage: RecordPage[],
    totalPrice: number,
    currentServicesRowSelection: Record<string, boolean>,
    paymentMethodSelection: Record<string, boolean>,
    servicesPaginationState: PaginationState,
    paymentMethod: PaymentMethodEntity,
    done: boolean
}

//RESPONSE

export type SaleItemEntity = EntityBase & {
  quantity: number,
  from: string,
  to: string,
  service: ServiceEntity

}
enum SaleType {PACKAGE, SINGLE_SALE}
export type SaleEntity = EntityBase & {
  createdAt: string,
  client: ClientEntity,
  employee: EmployeeEntity,
  saleItem: SaleItemEntity[],
  total: number, //precio final
  type: SaleType,
  interest: number,
  discount: number
}

export type SaleEntityDB = EntityBase & {
  createdAt: string,
  fk_client: number,
  fk_employee: number,
  saleItem: string, //todo create saleitemdata
  type: SaleType,
  interest: number,
  discount: number
}