import { DataTablePage } from "@/components/data-table-page";
import { serviceColumns } from "../columns-service";
import { ServiceEntity } from "@/domain/service.domain";
import usePagination from "@/hooks/usePagination";
import servicesService from "@/services/services-service";

const AllServices = () => {
  //const data = useLoaderData() as ServiceEntity[];

  const intialPage = {
    pageIndex: 0,
    pageSize: 5,
  };

  const callFunction = servicesService.getPage.bind(servicesService);

  const { pagination, setPagination, pageData, rowCount, updateData } =
    usePagination<ServiceEntity>({
      intialPage: intialPage,
      call: callFunction,
    });
  return (
    <DataTablePage<ServiceEntity, number>
      columns={serviceColumns}
      data={pageData}
      rowCount={rowCount}
      pagination={pagination}
      setPagination={setPagination}
      updateDataFn={updateData}
    />
  );
};

export default AllServices;
