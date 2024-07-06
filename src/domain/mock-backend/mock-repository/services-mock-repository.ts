import { ServiceEntity } from "@/domain/service.domain";
import { MockRepositoryImpl } from "./mock-repository-impl";
import servicesMockData from "../../../lib/service/adapter/service-mock-db";


export class ServicesMockRepository extends MockRepositoryImpl<ServiceEntity> {

    constructor() {
        super(servicesMockData());
    }
}