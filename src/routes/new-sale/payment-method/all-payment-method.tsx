import { DataTablePage } from '@/components/data-table-page';
import { useAuthContext } from '@/context/auth-context'
import { PaymentMethodEntity } from '@/domain/payment-method.domain';
import usePagination from '@/hooks/usePagination';
import paymentMethodService from '@/services/payment-method.service';
import React, { useRef } from 'react'
import { PaymentMethodColumns } from './payment-method.columns';
import { useNewSaleContext } from '@/context/new-sale.context';
import { DataTableSelect } from '@/components/data-table-select';
import { RowSelectionState } from '@tanstack/react-table';

const AllPaymentMethod = () => {

    const { role } = useAuthContext();
    const { selectPaymentMethod, state } = useNewSaleContext();
    const paymentMethodRef = useRef(paymentMethodService(role));
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
      call: paymentMethodRef.current.getPage.bind(paymentMethodRef.current)<PaymentMethodEntity>
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