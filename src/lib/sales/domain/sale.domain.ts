import { PaginationState } from "@tanstack/react-table"
import { ServiceEntity } from "../../service/domain/service.entity"
import { ClientEntity } from "@/lib/user/domain/client.entity"
import { PaymentMethodEntity } from "@/lib/payment-method/domain/payment-method.entity"
import { EntityBase } from "@/lib/common/domain/entities/entity-base"
import { EmployeeEntity } from "@/lib/user/domain/employee.entity"



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
    totalPrice: number,
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