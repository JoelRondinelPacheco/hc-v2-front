import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import categoryService from "@/services/category-service";
import { DataTablePage } from "./data-table-page";
import { columnsCategory } from "./columns-category";
import { CategoryEntity } from "@/domain/category.domain";
import usePagination from "@/hooks/usePagination";

const Categories = () => {
  /*
    TODO
      Editar: Actualizar el elemento en el state con el index,
  */
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
    <Card className="">
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        {/* <CardDescription>Dashboard segun el la tarea que eligio el usuario</CardDescription>*/}
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-5">
          <DataTablePage
            data={pageData}
            columns={columnsCategory}
            pagination={pagination}
            setPagination={setPagination}
            rowCount={rowCount}
            updateDataFn={updateData}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Categories;
