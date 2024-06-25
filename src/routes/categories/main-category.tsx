import categoryService from "@/services/category-service";
import { DataTablePage } from "../../components/data-table-page";
import { columnsCategory } from "./columns-category";
import { CategoryEntity } from "@/domain/category.domain";
import { useAuthContext } from "@/context/auth-context";
import usePagination from "@/hooks/usePagination";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { createCategoryMockRepository } from "@/lib/category/infrastructure/category-mock-repository";
import { createCategoryService } from "@/lib/category/application/category.service";

//contex que consuma casos de uso
//crea repo primero
const repository = createCategoryMockRepository();
const service = createCategoryService(repository);

function MainCategory() {
  
  const { httpService } = useAuthContext();
  //nuev
  const [data, setData] = useState<CategoryEntity[] | null>(null)


  const initialPage = {
    pageIndex: 0,
    pageSize: 5,
  };

  const { pagination, setPagination, pageData, rowCount, pageCount, updateData } = usePagination<CategoryEntity>({
    initialPage: initialPage,
    call: httpService.getPage<CategoryEntity>,
    endpoint: "/category"
  })

  useEffect(() => {
    service.getPage(initialPage).request.then(r => setData(r.data.content));
  }, [])  

  //tabla recibe paginacion, y set paginacion
  //cambia set paginacion
  // query recibe objeto query no paginacion
  // escuchar cuando cambia paginacion y cambiar query
  return (
    <>
    <DataTablePage<CategoryEntity, number>
      columns={columnsCategory}
      data={data ? data : pageData}
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
