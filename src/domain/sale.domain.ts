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