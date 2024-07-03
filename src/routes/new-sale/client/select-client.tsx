import { DataTablePage } from "@/components/data-table-page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Pageable } from "@/domain/commons.domain";
import { clientColumnsSelect } from "./clients-columns-select";
import { DataTableSelect } from "@/components/data-table-select";
import { useEffect, useRef, useState } from "react";
import { useNewSaleContext } from "@/context/new-sale.context";
import { PaginationState, RowSelectionState } from "@tanstack/react-table";
import { useGlobalContext } from "@/lib/common/infrastructure/react/global-context";
import usePagination from "@/hooks/usePagination";
import { ClientEntity } from "@/lib/user/domain/client.entity";

const SelectClient = () => {
  const {
        state,
        dispatch,
        clientsState,
        dispatchClients,
        clientsOnChangeRowSelection,
        clientsOnChangePagination
        } = useNewSaleContext();

  const { repository, service } = useGlobalContext();


  const { pagination, pageContent, setPagination, rowCount, pageCount, updateData } =
    usePagination<ClientEntity>({
      initialPage: clientsState.clientsPagination,
      call:  service(repository.client).getPage,
    });

    /***** CLIENTS STARTER *****/
    useEffect(() => {
      dispatchClients({
        type: "RECORDS_STARTER",
        payload: pageCount
      })
    }, [pageCount])
    /***** CLIENTS STARTER *****/
    //call:  fetchState.httpService.getPage.bind(fetchState.httpService)<ClientEntity>,
//clientServiceRef.current.getPage.bind(clientServiceRef.current)<ClientEntity>,
/*** CLIENTS SELECTION ***/

    const onClientRowSelectionChange = (rowsUpdater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) => {
      clientsOnChangeRowSelection(rowsUpdater, pagination, pageContent)
      //lamar al handler del state
    }
    useEffect(() => {

    }, [clientsState.clientRecords])

/*** CLIENTS SELECTION ***/



/*** CLIENTS PAGINATION ***/
    const onClientPaginationChange = (paginationUpdater: PaginationState | ((old: PaginationState) => PaginationState)) => {
      clientsOnChangePagination(paginationUpdater);
      //lamar al client pagination handler del context
    }

    //coordina la paginacion del context con la del hook
    useEffect(() => {
      setPagination(clientsState.clientsPagination);
    }, [clientsState.clientsPagination])
/*** CLIENTS PAGINATION ***/


  return (
    <Card>
      <CardHeader>
        <CardTitle>Select client</CardTitle>
          <div className="flex justify-between pt-2">
            <div className="flex items-center gap-2 w-1/3">
              <h3>Name: </h3>
              {clientsState.client.id === 0 ? (
                <Skeleton className="w-[200px] h-[20px] rounded-sm" />
              ) : (
                <h3>
                  {clientsState.client.person.name} {clientsState.client.person.lastname}
                </h3>
              )}
            </div>
            <div className="flex items-center gap-2 w-1/3">
              <h3>DNI: </h3>
              {clientsState.client.id === 0 ? (
                <Skeleton className="w-[200px] h-[20px] rounded-sm" />
              ) : (
                <h3>{clientsState.client.person.dni}</h3>
              )}
            </div>
            <div className="flex items-center gap-2 grow">
              <h3>Email:</h3>
              {clientsState.client.id === 0 ? (
                <Skeleton className="w-[200px] h-[20px] rounded-sm" />
              ) : (
                <h3>{clientsState.client.person.email}</h3>
              )}
            </div>
          </div>
      </CardHeader>
      <CardContent>
        <DataTableSelect<ClientEntity, number>
          data={pageContent}
          columns={clientColumnsSelect}
          pagination={pagination}
          setPagination={onClientPaginationChange}
          rowCount={rowCount}
          updateDataFn={updateData}
          rowSelection={clientsState.currentClientPageRecord}
          setRowSelection={onClientRowSelectionChange}
          multiRowSelection={false}
          pageCount={pageCount}
        />
      </CardContent>
    </Card>
  );
};

export default SelectClient;
