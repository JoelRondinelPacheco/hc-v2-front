import { DataTablePage } from '@/components/data-table-page';
import { useGlobalContext } from '@/lib/common/infraestructure/react/global-context'
import { EmployeeEntity } from '@/domain/client.domain';
import { Pageable } from '@/domain/commons.domain';
import usePagination from '@/hooks/usePagination';
import { employeeColumns } from './employee-columns';

const AllEmployees = () => {

  const { httpService } = useGlobalContext();

  const initialPage: Pageable = {
    pageIndex: 0,
    pageSize: 5
  }
  const { pagination, setPagination, rowCount, pageData, pageCount, updateData } = usePagination({
    initialPage: initialPage,
    call: httpService.getPage<EmployeeEntity>,
    endpoint: "/employee"
  })

  return (
    <DataTablePage<EmployeeEntity, number>
      data={pageData}
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