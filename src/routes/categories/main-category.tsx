import categoryService from "@/services/category-service";
import { DataTablePage } from "../../components/data-table-page";
import { columnsCategory } from "./columns-category";
import { CategoryEntity } from "@/domain/category.domain";
import { useAuthContext } from "@/context/auth-context";
import usePagination from "@/hooks/usePagination";

function MainCategory() {

  const { role, httpService } = useAuthContext();


  const initialPage = {
    pageIndex: 0,
    pageSize: 5,
  };

  const { pagination, setPagination, pageData, rowCount, pageCount, updateData } = usePagination<CategoryEntity>({
    initialPage: initialPage,
    call: httpService.getPage<CategoryEntity>,
    endpoint: "/category"
  })

  //tabla recibe paginacion, y set paginacion
  //cambia set paginacion
  // query recibe objeto query no paginacion
  // escuchar cuando cambia paginacion y cambiar query
  return (
    <DataTablePage<CategoryEntity, number>
      columns={columnsCategory}
      data={pageData}
      rowCount={rowCount}
      pagination={pagination}
      setPagination={setPagination}
      updateDataFn={updateData}
      pageCount={pageCount}
    />
  );
}

export default MainCategory;
