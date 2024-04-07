import { Client } from '@/domain/client.domain'
import { Pageable } from '@/domain/commons.domain'
import usePagination from '@/hooks/usePagination'
import clientService from '@/services/client-service'
import { DataTablePage } from '../../components/data-table-page'
import { clientColumns } from './clients-columns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Clients = () => {


  const initialState: Pageable = {
    pageIndex: 0,
    pageSize: 5
  }

  const callFunction = clientService.getPage.bind(clientService);

  const { pagination, setPagination, rowCount, pageData, updateData } = usePagination({
    intialPage: initialState,
    call: callFunction<Client>
  })

  return (
    <Card className='mb-4'>
        <CardHeader>
          <div className='flex justify-between'>
            <CardTitle>Clients</CardTitle>
            <Link to="/clients/new-client"><Button variant="outline">New Client</Button></Link>
            </div>
        </CardHeader>
        
        <CardContent>
        <DataTablePage<Client, number>
      data={pageData}
      columns={clientColumns}
      pagination={pagination}
      setPagination={setPagination}
      rowCount={rowCount}
      updateDataFn={updateData}
    />

        </CardContent>
    </Card>
    

    
  )
}

export default Clients