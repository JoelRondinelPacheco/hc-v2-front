import { Pageable } from "@/domain/commons.domain";
import { RecordPage } from "@/domain/sale.domain";
import { ServiceEntity } from "@/domain/service.domain";
import { record } from "zod";

export function recordsStarter(total: number, prev: RecordPage[]): RecordPage[] {
/*
    let recordsStarter: RecordPage[] = [];
    for (let i = 0; i < total ; i++ ) {
        if (prev[i]) {
            recordsStarter.push(prev[i])
        } else {
        recordsStarter.push({pageIndex: i, record: {}})
        }
    }
    return recordsStarter;*/
    return [...prev]
}

const getEquivalentId = (pageIndex: number, pageSize: number, recordId: number | string): number => {
    let finalId = Number(recordId);
      return pageSize * pageIndex + finalId + 1;
  }
const getListEquivalentIds = (record: Record<string, boolean>, pageable: Pageable): number[] => {
    let arr: number[] = [];
    for(const id in record) {
        arr.push(getEquivalentId(pageable.pageIndex, pageable.pageSize, id));
    }
    return arr;
}

export function servicesSelectedByPage (pagination: Pageable, records: Record<string, boolean>, services: ServiceEntity[]): ServiceEntity[] {
    //ids equivalentes en el record
    let equivalentIds = getListEquivalentIds(records, pagination);

    let matching = services.filter(service => equivalentIds.includes(service.id));
    return matching;
}