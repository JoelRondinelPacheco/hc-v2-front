import { SaleEntity } from "@/domain/sale.domain";
import { MockRepositoryImpl } from "./mock-repository-impl";
import salesMockData from "../mock-database/sales-mock-db";

export class SaleMockRepository extends MockRepositoryImpl<SaleEntity> {
    constructor(){
        super(salesMockData());
    }
}