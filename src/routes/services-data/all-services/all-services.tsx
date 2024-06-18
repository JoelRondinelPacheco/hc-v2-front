import { DataTablePage } from "@/components/data-table-page";
import { serviceColumns } from "../columns-service";
import { ServiceEntity } from "@/domain/service.domain";
import usePagination from "@/hooks/usePagination";
import servicesService from "@/services/services-service";
import { useRef } from "react";
import { useAuthContext } from "@/context/auth-context";

const AllServices = () => {
  //const data = useLoaderData() as ServiceEntity[];
  const { role } = useAuthContext();

  const intialPage = {
    pageIndex: 0,
    pageSize: 5,
  };

  const serviceServiceRef = useRef(servicesService(role));


  const { pagination, setPagination, pageData, rowCount, pageCount, updateData } =
    usePagination<ServiceEntity>({
      initialPage: intialPage,
      call: serviceServiceRef.current.getPage.bind(serviceServiceRef.current),
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
