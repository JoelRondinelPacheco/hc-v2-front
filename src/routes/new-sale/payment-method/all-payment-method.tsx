import { PaymentMethodColumns } from './payment-method.columns';
import { useNewSaleContext } from '@/context/new-sale.context';
import { DataTableSelect } from '@/components/data-table-select';
import { RowSelectionState } from '@tanstack/react-table';
import { useGlobalContext } from '@/lib/common/adapter/react/global-context';
import usePagination from '@/hooks/usePagination';
import { PaymentMethodEntity } from '@/lib/payment-method/domain/payment-method.entity';

const AllPaymentMethod = () => {

    const { selectPaymentMethod, state } = useNewSaleContext();
    const { repository, service } = useGlobalContext();

    const initialPage = {
        pageIndex: 0,
        pageSize: 10
    }

    const {
      pagination,
      setPagination,
      pageContent,
      rowCount,
      pageCount,
      updateData
    } = usePagination<PaymentMethodEntity>({
      initialPage: initialPage,
      call: service(repository.paymentMethod).getPage
    })

    const onPaymentMethodChange = (paymentMethodUpdater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) => {
      selectPaymentMethod(paymentMethodUpdater, pageContent)
    }

  return (
    <>
    
    
    <DataTableSelect<PaymentMethodEntity, number>
      data={pageContent}
      columns={PaymentMethodColumns}
      pagination={pagination}
      setPagination={setPagination}
      rowCount={rowCount}      
      updateDataFn={updateData}
      rowSelection={state.paymentMethodSelection}
      setRowSelection={onPaymentMethodChange}
      multiRowSelection={false}
      pageCount={pageCount}
      showPagination={false}
    />
    </>
  )
}

export default AllPaymentMethod