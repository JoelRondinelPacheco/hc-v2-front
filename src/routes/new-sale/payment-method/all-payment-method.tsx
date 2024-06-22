import { PaymentMethodEntity } from '@/domain/payment-method.domain';
import usePagination from '@/hooks/usePagination';
import { PaymentMethodColumns } from './payment-method.columns';
import { useNewSaleContext } from '@/context/new-sale.context';
import { DataTableSelect } from '@/components/data-table-select';
import { RowSelectionState } from '@tanstack/react-table';

const AllPaymentMethod = () => {

    const { selectPaymentMethod, state, httpService } = useNewSaleContext();

    const initialPage = {
        pageIndex: 0,
        pageSize: 10
    }

    const {
      pagination,
      setPagination,
      pageData,
      rowCount,
      pageCount,
      updateData
    } = usePagination({
      initialPage: initialPage,
      call: httpService.getPage<PaymentMethodEntity>,
      endpoint: "/payment-method"
    })

    const onPaymentMethodChange = (paymentMethodUpdater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) => {
      selectPaymentMethod(paymentMethodUpdater, pageData)
    }

  return (
    <>
    
    
    <DataTableSelect<PaymentMethodEntity, number>
      data={pageData}
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