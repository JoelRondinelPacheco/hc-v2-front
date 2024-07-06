import { DataTablePage } from "@/components/data-table-page";
import { serviceColumns } from "../columns-service";
import { useGlobalContext } from "@/lib/common/adapter/react/global-context";
import usePagination from "@/hooks/usePagination";
import { ServiceEntity } from "@/lib/service/domain/service.entity";

const AllServices = () => {
  const { repository, service } = useGlobalContext();

  const initialPage = {
    pageIndex: 0,
    pageSize: 5,
  };

  const {
    pageContent,
    rowCount,
    pageCount,
    loading,
    error,
    pagination,
    setPagination,
    updateData
 } = usePagination<ServiceEntity>({
    call: service(repository.service).getPage,
    initialPage: initialPage
})
  return (
    <DataTablePage<ServiceEntity, number>
      columns={serviceColumns}
      data={pageContent}
      rowCount={rowCount}
      pagination={pagination}
      setPagination={setPagination}
      updateDataFn={updateData}
      pageCount={pageCount}
    />
  );
};

export default AllServices;
