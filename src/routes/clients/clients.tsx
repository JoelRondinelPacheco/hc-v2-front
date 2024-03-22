import { Client } from '@/domain/client.domain'
import { Pageable } from '@/domain/commons.domain'
import usePagination from '@/hooks/usePagination'
import clientService from '@/services/client-service'
import { DataTablePage } from '../categories/data-table-page'
import { clientColumns } from './clients-columns'

const Clients = () => {


  const initialState: Pageable = {
    pageIndex: 0,
    pageSize: 2
  }

  const callFunction = clientService.getPage.bind(clientService);

  const { pagination, setPagination, rowCount, pageData } = usePagination({
    intialPage: initialState,
    call: callFunction<Client>
  })

  return (
    <DataTablePage
      data={pageData}
      columns={clientColumns}
      pagination={pagination}
      setPagination={setPagination}
      rowCount={rowCount}

    />


    
  )
}

export default Clients