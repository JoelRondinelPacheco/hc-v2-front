import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useAsync from '@/hooks/useAsync';
import useFetchAndLoad from '@/hooks/useFetchAndLoad';
import categoryService from '@/services/category-service'
import { useState } from 'react';
import { DataTable } from './data-table';
import { columnsCategory } from './columns-category';
import { CategoryEntity } from '@/domain/category.domain';

const Categories = () => {
  /*
    TODO
      Editar: Actualizar el elemento en el state con el index,
      Crear logica de form aqui???
  */

  const [categories, setCategories] = useState<CategoryEntity[]>([])

  const { loading, callEndpoint } = useFetchAndLoad();
  console.log(loading)
  const getCatPage = async () => await callEndpoint(categoryService.getAll())

  const callSuccess = (data: any) => {
    setCategories(data.content)
  }
/*
  const callReturn = (data: any) => {
    //todo mapear
    apiToDomain(data.content)

  }*/

  useAsync(getCatPage, callSuccess, () => {}, [])

  return (
    <Card className="">
        <CardHeader>
            <CardTitle>Categories</CardTitle>
            {/* <CardDescription>Dashboard segun el la tarea que eligio el usuario</CardDescription>*/}
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col gap-5">
            <DataTable columns={columnsCategory} data={categories} />
            </div>
        </CardContent>
     

    </Card>
  )
}

export default Categories