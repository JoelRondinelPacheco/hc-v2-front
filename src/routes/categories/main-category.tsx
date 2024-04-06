import categoryService from "@/services/category-service";
import { DataTablePage } from "../../components/data-table-page";
import { columnsCategory } from "./columns-category";
import { CategoryEntity } from "@/domain/category.domain";
import usePagination from "@/hooks/usePagination";

function MainCategory() {
    const intialPage = {
        pageIndex: 0,
        pageSize: 2,
      };
    
      const callFunction = categoryService.getPage.bind(categoryService);
    
      const { pagination, setPagination, pageData, rowCount, updateData } =
        usePagination<CategoryEntity>({
          intialPage: intialPage,
          call: callFunction<CategoryEntity>,
        });

  return (
    <DataTablePage<CategoryEntity, number>
            data={pageData}
            columns={columnsCategory}
            pagination={pagination}
            setPagination={setPagination}
            rowCount={rowCount}
            updateDataFn={updateData}
          />
  )
}

export default MainCategory