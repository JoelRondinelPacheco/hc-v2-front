import { DataTablePage } from '@/components/data-table-page';
import { useGlobalContext } from '@/lib/common/infrastructure/react/global-context';
import { Pageable } from '@/domain/commons.domain';
import { clientColumns } from '../clients-columns';
import usePagination from '@/hooks/usePagination';
import { ClientEntity } from '@/lib/user/domain/client.entity';

const AllClients = () => {

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
 } = usePagination<ClientEntity>({
    call: service(repository.client).getPage,
    initialPage: initialPage
})

  return (
    <DataTablePage<ClientEntity, number>
      data={pageContent}
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