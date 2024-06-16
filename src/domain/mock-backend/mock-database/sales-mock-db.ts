import { SaleEntity } from "@/domain/sale.domain";

const sales: SaleEntity[] = [

]

export default function salesMockData(): SaleEntity[] {
    return [...sales];
}