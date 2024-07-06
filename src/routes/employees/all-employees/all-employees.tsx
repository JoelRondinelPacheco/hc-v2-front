import { DataTablePage } from '@/components/data-table-page';
import { useGlobalContext } from '@/lib/common/adapter/react/global-context'
import { Pageable } from '@/domain/commons.domain';
import { employeeColumns } from './employee-columns';
import usePagination from '@/hooks/usePagination';
import { EmployeeEntity } from '@/lib/user/domain/employee.entity';

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
call: service(repository.employee).getPage,
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