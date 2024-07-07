import { Pageable } from "@/lib/common/domain/entities/pagination";
import { RecordPage } from "@/lib/sales/domain/sale.domain";
import { ServiceEntity } from "@/lib/service/domain/service.entity";

export function recordsStarter(total: number, prev: RecordPage[]): RecordPage[] {

    return [...prev]
}



export function servicesSelectedByPage (pagination: Pageable, records: Record<string, boolean>, services: ServiceEntity[]): ServiceEntity[] {
    //ids equivalentes en el record
    let ids: number[] = []
    
    Object.keys(records).forEach(([key]) => ids.push(Number(key)))

    let matching = services.filter(service => ids.includes(service.id));
    return matching;
}