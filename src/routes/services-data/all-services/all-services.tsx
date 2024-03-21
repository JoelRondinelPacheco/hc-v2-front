import { DataTable } from '@/routes/categories/data-table';
import { useLoaderData } from 'react-router-dom';
import { serviceColumns } from '../columns-service';
import { ServiceEntity } from '@/domain/service.domain';

const AllServices = () => {
    const data = useLoaderData() as ServiceEntity[];
  return (
    <DataTable columns={serviceColumns} data={data} />
  )
}

export default AllServices