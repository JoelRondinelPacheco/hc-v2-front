import { DataTable } from '@/routes/categories/data-table';
import { ServiceEntity } from '@/services/services-service';
import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { serviceColumns } from '../columns-service';

const AllServices = () => {
    const data = useLoaderData() as ServiceEntity[];
  return (
    <DataTable columns={serviceColumns} data={data} />
  )
}

export default AllServices