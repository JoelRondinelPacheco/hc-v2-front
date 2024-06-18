import { DataTableSelect } from "@/components/data-table-select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceColumnsSelect } from "./service-columns-select";
import { useEffect, useRef, useState } from "react";
import servicesService from "@/services/services-service";
import usePagination from "@/hooks/usePagination";
import { ServiceEntity } from "@/domain/service.domain";
import { useNewSaleContext } from "@/context/new-sale.context";
import { RecordPage } from "@/domain/sale.domain";
import { CircleX, Info } from "lucide-react";
import { useAuthContext } from "@/context/auth-context";
import { PaginationState, RowSelection, RowSelectionState } from "@tanstack/react-table";

const SelectServices = () => {
  /*
  Iniciar con page 0
  */
  const { 
    state,
    dispatch,
    getRowSelectionByPage,
    onChangeRow,
    onChangePagination,
    currentServicesRowSelection,
  } = useNewSaleContext();
  //const { services: rowSelection } = state
  const { role } = useAuthContext();
  const [changePage, setChangePage] = useState<boolean>(false);
  const servicesServiceRef = useRef(servicesService(role));

  const intialPage = {
    pageIndex: 0,
    pageSize: 5,
  };

  //row selection es el index y boolean, puede vernir del context
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const callFunction = servicesServiceRef.current.getPage.bind(
    servicesServiceRef.current
  );

  const {
    pagination,
    setPagination, //todo llamar al pagination de context
    pageData,
    pageCount,
    rowCount,
    updateData,
  } = usePagination<ServiceEntity>({
    initialPage: state.servicesPaginationState,
    call: callFunction,
  });

  useEffect(() => {
    setPagination(state.servicesPaginationState)
  }, [state.servicesPaginationState])
  //setea los records por pagina
  useEffect(() => {
    dispatch({
      type: "STARTER_RECORD_BY_PAGE_B",
      payload: pageCount
    })
  }, [pageCount])

  function deleteServiceFromButton(
    indexPage: number,
    indexService: number,
    itemId: number
  ) {
    /*
    Envio:
      Pagina actual (currentPage),
      Pagina en la que se encuentra el servicios (indexPage)
      Id del item

    Si es la misma pagina actualizo el record *local*
    indexService es util para el array de servicios
    indexPage es la pagina en la que se encuentra el serv que se va a eliminar

    */
    if (indexPage === pagination.pageIndex) {
      let emptyRecord: Record<string, boolean> = {};
      for (const key in rowSelection) {
        let keyToDelete;

        if (indexPage * pagination.pageSize === itemId - 1) {
          keyToDelete = 0;
        } else if (itemId === (indexPage + 1) * pagination.pageSize) {
          keyToDelete = pagination.pageSize - 1;
        } else {
          keyToDelete =
            pagination.pageSize -
            (itemId % ((indexPage + 1) * pagination.pageSize)) -
            1;
        }

        if (key !== String(keyToDelete)) {
          emptyRecord[key] = true;
        }
      }
      console.log(emptyRecord);
      setRowSelection(emptyRecord);
    }
    console.log(indexPage);
    dispatch({
      type: "REMOVE_SERVICE_FROM_BUTTON",
      payload: {
        indexPage: indexPage,
        indexService: indexService,
        pageSize: pagination.pageSize,
        itemId: itemId,
        currentPage: pagination.pageIndex,
      },
    });
  }
//export type RowSelectionState = Record<string, boolean>;
//export type Updater<T> = T | ((old: T) => T);
//export type OnChangeFn<T> = (updaterOrValue: Updater<T>) => void;
//onRowSelectionChange?: OnChangeFn<RowSelectionState>;


//onRowSelectionChange?: OnChangeFn<RowSelectionState>;
//            (updaterOrValue: Updater<T>) => void;
//recibe una funcion que retorna void,
//el arg de esta funcion de esta funcion es T (RowSel) | (odl: T) =>T
 

  const onChangeRowHandler = (rowsUpdater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) => {
    onChangeRow(rowsUpdater, pagination, pageData);
  }
  const onPaginationChangeHandler = (paginationUpdater: PaginationState | ((old: PaginationState) => PaginationState)) => {
    onChangePagination(paginationUpdater)
  }
  /*
    TODO ON PAGE CHANGE:
      SEGUIMIENTO DE PAGINAS
      SELECIONAR CURRENT ROW SELECTOR SEGUN LA PAGINA,
  */
/*
  useEffect(() => {
    console.log(rowSelection)
    let services: ServiceEntity[] = [];
   // if (!changePage) {
      console.log("entrooo");
      for(const id in rowSelection) {
        let v = rowSelection[id];
        console.log("Id: " +id + " Value: " + v )
    }
      for (const id in rowSelection) {
       
        let service: ServiceEntity | undefined = pageData.find(
          (data) =>
            data.id ===
            pagination.pageSize * pagination.pageIndex + Number(id) + 1
        );
        if (service) {
          services.push(service);
        }
     // }

      //la tabla lo setea, y ya se actualiza, llamar directo al context?

    }
    setChangePage(false);
  }, [rowSelection]);*/

  useEffect(() => {
    //seleccionar los records al cambiar pagination
    /*
    let record: RecordPage | undefined = undefined;
    record = state.recordByPage.find(
      (record) => record.pageIndex === pagination.pageIndex
    );
    if (record) {
      setRowSelection(record.record);
    } else {
      setRowSelection({});
      dispatch({
        type: "SET_NEW_PAGE",
        payload: pagination.pageIndex,
      });
    }
    setChangePage(true);
    console.log(rowSelection);*/
    //cuando cambia la pagina, llamo a los records de esa pagina y los seteo,
    //o guardo en variable?
    setRowSelection(getRowSelectionByPage(pagination.pageIndex))
  }, [pagination]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Service</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 items-stretch">
        <div className="grow">
          <DataTableSelect<ServiceEntity, number>
            data={pageData}
            columns={serviceColumnsSelect}
            pagination={state.servicesPaginationState}
            setPagination={onPaginationChangeHandler}
            rowCount={rowCount}
            updateDataFn={updateData}
            rowSelection={currentServicesRowSelection}
            setRowSelection={onChangeRowHandler}
            multiRowSelection={true}
            pageCount={pageCount}
          />
        </div>
        <div>
          <Card className="h-full">
            <CardContent className="h-full pt-6 w-[350px] flex flex-col justify-between">
              <div>
                {state.services.map((servicePage, indexPage) => {
                  return (
                    <div key={indexPage} className="space-y-2">
                      {servicePage.services.map((service, indexService) => {
                        return (
                          <div
                            key={indexService}
                            className="flex justify-between w-full gap-8 items-center"
                          >
                            <div className="flex gap-4 grow">
                             
                              <div className="flex justify-between grow">
                                <h3>{service.name}</h3> <h3>{service.price}</h3>
                              </div>
                            </div>

                            <div
                              onClick={() =>
                                deleteServiceFromButton(
                                  indexPage,
                                  indexService,
                                  service.id
                                )
                              }
                            >
                              <CircleX className="text-slate-600 hover:text-red-400 hover:cursor-pointer w-[20px]" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between w-full">
                <h3>Total:</h3>
                <h3>{state.totalPrice}</h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelectServices;
