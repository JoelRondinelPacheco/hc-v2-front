import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import useAsync from '@/hooks/useAsync';
import useFetchAndLoad from '@/hooks/useFetchAndLoad';
import useGetPage from '@/hooks/useGetPage'
import categoryService, { Category } from '@/services/category-service'
import create from '@/services/http-service';
import { useState } from 'react';

const Categories = () => {

  const [categories, setCategories] = useState<Category[]>([])

  const { loading, callEndpoint } = useFetchAndLoad();

  const getCatPage = async () => await callEndpoint(categoryService.getAll())

  const catContent = (data: any) => {
    setCategories(data.content)
  }

  useAsync(getCatPage, catContent, () => {}, [])
  console.log(categories)

  return (
    <Card className="max-w-[450px]">
        <CardHeader>
            <CardTitle>Dashboard Categories</CardTitle>
            <CardDescription>Dashboard segun el la tarea que eligio el usuario</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col gap-5">
            {
              loading
                ? <h2>Loading</h2>
                : categories.map((category, idx) => {
                    return <div key={idx}><h2>{category.name}</h2><h3>{category.description}</h3></div>
                  })
                 }
            </div>
        </CardContent>
    </Card>
  )
}

export default Categories