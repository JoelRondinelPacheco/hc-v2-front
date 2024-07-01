import { DataTablePage } from "../../components/data-table-page";
import { columnsCategory } from "./columns-category";
import { useGlobalContext } from "@/lib/common/infrastructure/react/global-context";
import usePagination from "@/hooks/usePagination";
import { CategoryEntity } from "@/lib/category/domain/category.entity";

function MainCategory() {
  
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
       } = usePagination<CategoryEntity>({
    call: service(repository.category).getPage,
    initialPage: initialPage
  })

  return (
    <>
    <DataTablePage<CategoryEntity, number>
      columns={columnsCategory}
      data={pageContent}
      rowCount={rowCount}
      pagination={pagination}
      setPagination={setPagination}
      updateDataFn={updateData}
      pageCount={pageCount}
    />
    </>
  );
}

export default MainCategory;