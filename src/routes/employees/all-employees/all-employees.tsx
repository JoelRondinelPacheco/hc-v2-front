import { DataTablePage } from '@/components/data-table-page';
import { useGlobalContext } from '@/context/global-context'
import { employeeColumns } from './employee-columns';
import usePagination from '@/hooks/usePagination';
import { EmployeeEntity } from '@/lib/user/domain/employee.entity';
import { Pageable } from '@/lib/common/domain/entities/pagination';

const AllEmployees = () => {

  const { repository, service } = useGlobalContext();

  const initialPage: Pageable = {
    pageIndex: 0,
    pageSize: 5
  }

  const {
    pageContent,
    rowCount,
    pageCount,
    loading,
    error,
    pagination,
    setPagination,
    updateData
 } = usePagination<EmployeeEntity>({
call: service.employee(repository.employee).getPage,
initialPage: initialPage
})


  return (
    <DataTablePage<EmployeeEntity, number>
      data={pageContent}
      columns={employeeColumns}
      pagination={pagination}
      setPagination={setPagination}
      rowCount={rowCount}
      updateDataFn={updateData}
      pageCount={pageCount}
    />
  )
}

export default AllEmployees