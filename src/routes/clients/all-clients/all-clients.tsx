import { DataTablePage } from '@/components/data-table-page';
import { useAuthContext } from '@/context/auth-context';
import { ClientEntity } from '@/domain/client.domain';
import { Pageable } from '@/domain/commons.domain';
import usePagination from '@/hooks/usePagination';
import clientService from '@/services/client-service';
import React, { useRef } from 'react'
import { clientColumns } from '../clients-columns';

const AllClients = () => {

    const { role } = useAuthContext();
  const clientServiceRef = useRef(clientService(role));

  const initialState: Pageable = {
    pageIndex: 0,
    pageSize: 5
  }

  const callFunction = clientServiceRef.current.getPage.bind(clientServiceRef.current);

  const { pagination, setPagination, rowCount, pageData, updateData } = usePagination({
    intialPage: initialState,
    call: callFunction<ClientEntity>
  })
  return (
    <DataTablePage<ClientEntity, number>
      data={pageData}
      columns={clientColumns}
      pagination={pagination}
      setPagination={setPagination}
      rowCount={rowCount}
      updateDataFn={updateData}
    />
  )
}

export default AllClients