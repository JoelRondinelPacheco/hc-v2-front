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

const SelectServices = () => {
  /*
  Iniciar con page 0
  */
  const { state, dispatch } = useNewSaleContext();
  const { role } = useAuthContext();
  const [changePage, setChangePage] = useState<boolean>(false);
  const servicesServiceRef = useRef(servicesService(role));

  const intialPage = {
    pageIndex: 0,
    pageSize: 5,
  };

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const callFunction = servicesServiceRef.current.getPage.bind(servicesServiceRef.current)

  const { pagination, setPagination, pageData, pageCount, rowCount, updateData } =
    usePagination<ServiceEntity>({
      initialPage: intialPage,
      call: callFunction,
    });

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
console.log(indexPage)
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

  useEffect(() => {
    let services: ServiceEntity[] = [];
    if (!changePage) {
      console.log("entrooo");
      for (const id in rowSelection) {
        //solo si es el record correspondiente a los datos de la pagina
        //por cada id en el record, busco el servicio que coincida con el seleccionado
        let service: ServiceEntity | undefined = pageData.find(
          (data) =>
            data.id ===
            pagination.pageSize * pagination.pageIndex + Number(id) + 1
        );
        if (service) {
          services.push(service);
        }
      }

      dispatch({
        type: "UPDATE_SELECTION",
        payload: {
          pageIndex: pagination.pageIndex,
          services: services,
          record: rowSelection,
        },
      });
    }
    setChangePage(false);
  }, [rowSelection]);

  useEffect(() => {
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
    console.log(rowSelection)
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
            pagination={pagination}
            setPagination={setPagination}
            rowCount={rowCount}
            updateDataFn={updateData}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
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
                              <Info className="hover:text-green-500 hover:cursor-pointer w-[20px]"/>
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
