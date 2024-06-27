import { ClientEntity } from '@/domain/client.domain'
import { Pageable } from '@/domain/commons.domain'
import usePagination from '@/hooks/usePagination'
import clientService from '@/services/client-service'
import { DataTablePage } from '../../components/data-table-page'
import { clientColumns } from './clients-columns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link, Outlet } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useGlobalContext } from '@/lib/common/infraestructure/react/global-context'
import { useRef } from 'react'

const Clients = () => {


  

  return (
    <Card className='mb-4'>
        <CardHeader>
          <div className='flex justify-between'>
            <CardTitle>Clients</CardTitle>
            <Link to="/hc-v2-front/clients/new-client"><Button variant="outline">New Client</Button></Link>
            </div>
        </CardHeader>
        <CardContent>
        <Outlet />
        </CardContent>
    </Card>
    

    
  )
}

export default Clients