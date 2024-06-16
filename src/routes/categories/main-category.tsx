import categoryService from "@/services/category-service";
import { DataTablePage } from "../../components/data-table-page";
import { columnsCategory } from "./columns-category";
import { CategoryEntity } from "@/domain/category.domain";
import useGet from "@/hooks/useGet";
import { Pageable, QueryParam } from "@/domain/commons.domain";
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "@/context/auth-context";

function MainCategory() {

  const { role } = useAuthContext();

  const categoryServiceRef = useRef(categoryService(role));

    const [page, setPage] = useState<Pageable>({
      pageIndex: 0,
      pageSize: 5,
    })

  useEffect(() => {
    setQueryParams(
      updatePage(queryParams, page)
      )
  }, [page])

  function updatePage(params: QueryParam[], page: Pageable, newQueryParams?: QueryParam): QueryParam[] {

    return params.map((query) => {
      if (query.key === "pageIndex") {
        return { key: "pageIndex", value: String(page.pageIndex)}
      } else if (query.key = "pageSize") {
        return { key: "pageSize", value: String(page.pageSize)}
      } else if (query.key === newQueryParams?.key) {
        return { key: query.key, value: newQueryParams.value}
      } else {
        return query
      }
    })

  }

  const {
    queryParams,
    setQueryParams,
    pageData: pageData2,
    rowCount: rowCount2,
    updateData: updateData2,
  } = useGet({
    initialQuery: [
      {
        key: "pageIndex",
        value: String(page.pageIndex),
      },
      {
        key: "pageSize",
        value: String(page.pageSize),
      },
    ],
    call: categoryServiceRef.current.getPageParams.bind(categoryServiceRef.current)<CategoryEntity>,
  });

  //tabla recibe paginacion, y set paginacion
  //cambia set paginacion
  // query recibe objeto query no paginacion
  // escuchar cuando cambia paginacion y cambiar query
  return (
    <DataTablePage<CategoryEntity, number>
      data={pageData2}
      columns={columnsCategory}
      pagination={page}
      setPagination={setPage}
      rowCount={rowCount2}
      updateDataFn={updateData2}
    />
  );
}

export default MainCategory;
