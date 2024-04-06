import { Client } from '@/domain/client.domain'
import { Pageable } from '@/domain/commons.domain'
import usePagination from '@/hooks/usePagination'
import clientService from '@/services/client-service'
import { DataTablePage } from '../../components/data-table-page'
import { clientColumns } from './clients-columns'

const Clients = () => {


  const initialState: Pageable = {
    pageIndex: 0,
    pageSize: 2
  }

  const callFunction = clientService.getPage.bind(clientService);

  const { pagination, setPagination, rowCount, pageData, updateData } = usePagination({
    intialPage: initialState,
    call: callFunction<Client>
  })

  return (
    <DataTablePage<Client, number>
      data={pageData}
      columns={clientColumns}
      pagination={pagination}
      setPagination={setPagination}
      rowCount={rowCount}
      updateDataFn={updateData}
    />


    
  )
}

export default Clients