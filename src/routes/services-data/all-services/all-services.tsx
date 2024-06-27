import { DataTablePage } from "@/components/data-table-page";
import { serviceColumns } from "../columns-service";
import { ServiceEntity } from "@/domain/service.domain";
import usePagination from "@/hooks/usePagination";
import servicesService from "@/services/services-service";
import { useRef } from "react";
import { useGlobalContext } from "@/lib/common/infraestructure/react/global-context";

const AllServices = () => {
  const { httpService } = useGlobalContext();

  const intialPage = {
    pageIndex: 0,
    pageSize: 5,
  };

  const { pagination, setPagination, pageData, rowCount, pageCount, updateData } =
    usePagination<ServiceEntity>({
      initialPage: intialPage,
      call: httpService.getPage<ServiceEntity>,
      endpoint: "/service"
    });
    
  return (
    <DataTablePage<ServiceEntity, number>
      columns={serviceColumns}
      data={pageData}
      rowCount={rowCount}
      pagination={pagination}
      setPagination={setPagination}
      updateDataFn={updateData}
      pageCount={pageCount}
    />
  );
};

export default AllServices;
