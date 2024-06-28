import categoryService from "@/services/category-service";
import { DataTablePage } from "../../components/data-table-page";
import { columnsCategory } from "./columns-category";
import { CategoryEntity } from "@/domain/category.domain";
import { useGlobalContext } from "@/lib/common/infraestructure/react/global-context";
import usePagination from "@/hooks/usePagination";
import { useEffect, useState } from "react";
import { createCategoryMockRepository } from "@/lib/category/infrastructure/category-mock-repository";
import { createCategoryAPIRepository } from "@/lib/category/infrastructure/category-api-repository";
import { createCategoryService } from "@/lib/category/application/category.service";
import usePaginationB from "@/hooks/usePaginationB";

//contex que consuma casos de uso
//crea repo primero
const repository = createCategoryMockRepository();
const repoApi = createCategoryAPIRepository();
const service = createCategoryService(repository);

function MainCategory() {
  
  const { state, service } = useGlobalContext();

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
          setPagination
       } = usePaginationB<CategoryEntity>({
    call: service(state.repository.category).getPage,
    initialPage: initialPage
  })
  const updateData= (data: any) => {
    console.log(data)
  }
  /*
  const updateData = () => {}
  const [pagination, setPagination] = useState(initialPage);
  useEffect(() => {
    service(state.repository.category).getPage(initialPage).request.then(r => setData(r.data.content));
  }, [])  
*/
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

/*
return (
    <>
    <DataTablePage<CategoryEntity, number>
      columns={columnsCategory}
      data={data}
      rowCount={rowCount}
      pagination={pagination}
      setPagination={setPagination}
      updateDataFn={updateData}
      pageCount={pageCount}
    />
    </>
  );
*/