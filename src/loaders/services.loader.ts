import { ServiceMapper } from "@/adapter/service.mapper";
import { PageData } from "@/domain/commons.domain";
import { ServiceEntity } from "@/domain/service.domain";
import servicesService from "@/services/services-service";


//todo try catch
export const allServicesLoader = async (): Promise<PageData<ServiceEntity>> => {
    let serviceMapper = new ServiceMapper();
    const { request } = servicesService.getAll<ServiceEntity>();
    try {
    const res = await request;
    return serviceMapper.apiToDomainPage(res.data);
    } catch (e) {
      throw e;
    }
  }