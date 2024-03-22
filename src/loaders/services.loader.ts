import { apiToDomainArray } from "@/adapter/service.mapper";
import { ServiceEntity } from "@/domain/service.domain";
import servicesService from "@/services/services-service";


//todo try catch
export const allServicesLoader = async (): Promise<ServiceEntity[]> => {
    const {request} = servicesService.getAll<ServiceEntity>();
    const res = await request;
    return apiToDomainArray(res.data);
  }