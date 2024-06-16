import { ServiceEntity } from "@/domain/service.domain";
import { PageMapper } from "./page.mapper";
import { PageData, Pageable } from "@/domain/commons.domain";

export class ServiceMapper implements PageMapper<ServiceEntity> {
  apiToDomainPage(data: any) {
    let services = this.apiToDomainArray(data.content);
    let pageable: Pageable = {
      pageIndex: data.pageable.pageIndex,
      pageSize: data.pageable.pageSize,
    };

    let pageData: PageData<ServiceEntity> = {
      content: services,
      totalElements: data.totalElements, //de toda la lista
      totalPages: data.totalPages,
      last: data.last,
      size: data.size, //num de elementos a mostrar en la pagina, lo especifica el usuario
      number: data.number, //es la pagina actual
      numberOfElements: data.numberOfElements, //elementos encontrados en la pagina actual
      first: data.first,
      empty: data.empty,
      pageable: pageable,
    };

    return pageData;
  }

  apiToDomain(service: any): ServiceEntity {
    let serviceEntity: ServiceEntity = {
      name: service.name,
      description: service.description,
      price: service.price,
      id: service.id,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
      category: service.category,
    };
    return serviceEntity;
  }

  apiToDomainArray(services: any[]): ServiceEntity[] {
    return services.map((service) => {
      return this.apiToDomain(service);
    });
  }
}
