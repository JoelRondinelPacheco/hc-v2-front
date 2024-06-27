import { DataTablePage } from '@/components/data-table-page';
import { useGlobalContext } from '@/lib/common/infraestructure/react/global-context';
import { ClientEntity } from '@/domain/client.domain';
import { Pageable } from '@/domain/commons.domain';
import usePagination from '@/hooks/usePagination';
import clientService from '@/services/client-service';
import React, { useEffect, useRef } from 'react'
import { clientColumns } from '../clients-columns';

const AllClients = () => {

    const { httpService } = useGlobalContext();

  const initialState: Pageable = {
    pageIndex: 0,
    pageSize: 5
  }

  const { pagination, setPagination, rowCount, pageData, pageCount, updateData } = usePagination({
    initialPage: initialState,
    call: httpService.getPage<ClientEntity>,
    endpoint: "/client"
  })

  return (
    <DataTablePage<ClientEntity, number>
      data={pageData}
      columns={clientColumns}
      pagination={pagination}
      setPagination={setPagination}
      rowCount={rowCount}
      updateDataFn={updateData}
      pageCount={pageCount}
    />
  )
}

export default AllClients