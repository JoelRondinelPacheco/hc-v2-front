import { DataTablePage } from "@/components/data-table-page";
import { serviceColumns } from "../columns-service";
import { ServiceEntity } from "@/domain/service.domain";
import { useGlobalContext } from "@/lib/common/infrastructure/react/global-context";
import usePagination from "@/hooks/usePagination";

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
