import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import useAsync from '@/hooks/useAsync';
import useFetchAndLoad from '@/hooks/useFetchAndLoad';
import useGetPage from '@/hooks/useGetPage'
import categoryService, { Category } from '@/services/category-service'
import create from '@/services/http-service';
import { useState } from 'react';
import { DataTable } from './data-table';
import { columnsCategory } from './columns-category';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Categories = () => {

  const [categories, setCategories] = useState<Category[]>([])

  const { loading, callEndpoint } = useFetchAndLoad();

  const getCatPage = async () => await callEndpoint(categoryService.getAll())

  const catContent = (data: any) => {
    setCategories(data.content)
  }

  useAsync(getCatPage, catContent, () => {}, [])

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