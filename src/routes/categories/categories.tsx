import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useAsync from '@/hooks/useAsync';
import useFetchAndLoad from '@/hooks/useFetchAndLoad';
import categoryService from '@/services/category-service'
import { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { columnsCategory } from './columns-category';
import { CategoryEntity } from '@/domain/category.domain';
import { PageData, Pageable } from '@/domain/commons.domain';
import {   ColumnDef, flexRender,getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { DataTablePagination } from './data-table-pagination';

const Categories = () => {
  /*
    TODO
      Editar: Actualizar el elemento en el state con el index,
      Crear logica de form aqui???
  */
//todo esta de aca muy probable hook
  const [pagination, setPagination] = useState<Pageable>(
    {
      pageIndex: 0,
      pageSize: 2
      }
    )

useEffect(() => {
console.log("cambio pagination")
console.log(pagination)
},[pagination])
    const [categories, setCategories] = useState<CategoryEntity[]>([])
/*
  const [categories, setCategories] = useState<PageData<CategoryEntity>>(
    {
      content: [],
      totalElements: 0,
      totalPages: 0,
      last: false,
      size: 0, 
      number: 0, //es la pagina actual
      numberOfElements: 0, //elementos encontrados en la pagina actual
      first: false,
      empty: true,
      pageable: pageable
    }
  )*/

  const { loading, callEndpoint } = useFetchAndLoad();

  const getCatPage = async () => await callEndpoint(categoryService.getPage<CategoryEntity>(pagination))

  //mapear en el servicio http???
  const callSuccess = (data: any) => {
    setCategories(data.content)
  }

  //TABLE
  const table = useReactTable({
    data: categories,
    columns: columnsCategory,
    getCoreRowModel: getCoreRowModel(),
    //pagination
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    rowCount: 5, //desde el back
      // pageCount: dataQuery.data?.pageCount, //alternatively directly pass in pageCount instead of rowCount
    onPaginationChange: setPagination,
    
    state: {
      //...
      pagination,
    }
    
  })

  useAsync(getCatPage, callSuccess, () => {}, [pagination])

  return (
    <Card className="">
        <CardHeader>
            <CardTitle>Categories</CardTitle>
            {/* <CardDescription>Dashboard segun el la tarea que eligio el usuario</CardDescription>*/}
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col gap-5">
            <DataTable columns={columnsCategory} data={categories} />
            <DataTablePagination table={table} />
            </div>
        </CardContent>
     

    </Card>
  )
}

export default Categories