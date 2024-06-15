import { DataTablePage } from "@/components/data-table-page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Client } from "@/domain/client.domain";
import { Pageable } from "@/domain/commons.domain";
import usePagination from "@/hooks/usePagination";
import Clients from "@/routes/clients/clients";
import clientService from "@/services/client-service";
import { clientColumnsSelect } from "./clients-columns-select";
import { DataTableSelect } from "@/components/data-table-select";
import { useEffect, useRef, useState } from "react";
import { useNewSaleContext } from "@/context/new-sale.context";
import { useAuthContext } from "@/context/auth-context";

const SelectClient = () => {
  const { state, dispatch } = useNewSaleContext();
  const { role } = useAuthContext();
  const clientServiceRef = useRef(clientService(role));

  const initialState: Pageable = {
    pageIndex: 0,
    pageSize: 5,
  };

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (Object.keys(rowSelection).length === 0) {
        dispatch({
            type: "DELETE_CLIENT",
          });
    } else (rowSelection)
    pageData.forEach((data) => {
      if (data.id === Number(Object.keys(rowSelection)[0]) + 1) {
        dispatch({
          type: "SET_CLIENT",
          payload: data,
        });
      }
    });
  }, [rowSelection]);


  const { pagination, setPagination, rowCount, pageData, updateData } =
    usePagination({
      intialPage: initialState,
      call: clientServiceRef.current.getPage.bind(clientServiceRef.current)<Client>,
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select client</CardTitle>
        <CardDescription>
          <div className="flex justify-between pt-2">
            <div className="flex items-center gap-2 w-1/3">
              <h3>Name: </h3>
              {state.client.id === 0 ? (
                <Skeleton className="w-[200px] h-[20px] rounded-sm" />
              ) : (
                <h3>
                  {state.client.person.name} {state.client.person.lastname}
                </h3>
              )}
            </div>
            <div className="flex items-center gap-2 w-1/3">
              <h3>DNI: </h3>
              {state.client.id === 0 ? (
                <Skeleton className="w-[200px] h-[20px] rounded-sm" />
              ) : (
                <h3>{state.client.person.dni}</h3>
              )}
            </div>
            <div className="flex items-center gap-2 grow">
              <h3>Email:</h3>
              {state.client.id === 0 ? (
                <Skeleton className="w-[200px] h-[20px] rounded-sm" />
              ) : (
                <h3>{state.client.person.email}</h3>
              )}
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTableSelect<Client, number>
          data={pageData}
          columns={clientColumnsSelect}
          pagination={pagination}
          setPagination={setPagination}
          rowCount={rowCount}
          updateDataFn={updateData}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          multiRowSelection={false}
        />
      </CardContent>
    </Card>
  );
};

export default SelectClient;
