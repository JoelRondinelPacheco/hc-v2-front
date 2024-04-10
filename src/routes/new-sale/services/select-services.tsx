import { DataTableSelect } from "@/components/data-table-select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceColumnsSelect } from "./service-columns-select";
import { useEffect, useState } from "react";
import servicesService from "@/services/services-service";
import usePagination from "@/hooks/usePagination";
import { ServiceEntity } from "@/domain/service.domain";
import { useNewSaleContext } from "@/context/new-sale.context";
import { RecordPage } from "@/domain/sale.domain";


const SelectServices = () => {
  /*
  Iniciar con page 0
  */
  const { state, dispatch } = useNewSaleContext();
  const [changePage, setChangePage] = useState<boolean>(false)

  const intialPage = {
    pageIndex: 0,
    pageSize: 2,
  };

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const callFunction = servicesService.getPage.bind(servicesService);

  const { pagination, setPagination, pageData, rowCount, updateData } =
    usePagination<ServiceEntity>({
      intialPage: intialPage,
      call: callFunction,
    });

  useEffect(() => {
    //setear paginacion en contexto
    dispatch({
      type: "STARTER_RECORD_BY_PAGE",
      payload: intialPage.pageIndex
    })
  }, [])

  useEffect(() => {

    console.log("selll")
    console.log(state)
    let services: ServiceEntity[] = [];
    /*
type RecordPage = {
  pageIndex: number;
  record: Record<string, boolean>;
};
*/
if(!changePage) {
      for (const id in rowSelection) {
          //solo si es el record correspondiente a los datos de la pagina
          //por cada id en el record, busco el servicio que coincida con el seleccionado
          let service: ServiceEntity | undefined = pageData.find(
            (data) =>
              data.id ===
              (pagination.pageSize * pagination.pageIndex + Number(id) + 1)
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
          record: rowSelection
        }
      })
    }
setChangePage(false)
  }, [rowSelection]);

  useEffect(() => {
    setChangePage(true)
    let record: RecordPage | undefined = undefined;
    record = state.recordByPage.find(
      (record) => record.pageIndex === pagination.pageIndex
    );
    if (record) {
      setRowSelection(record.record);
    } else {
      setRowSelection({});
      /*dispatch({
        type: "SET_RECORD_BY_PAGE",
        payload: { pageIndex: pagination.pageIndex, record: {}}
      });*/
      dispatch({
        type: "SET_NEW_PAGE",
        payload: pagination.pageIndex
      })
    }
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
          />
        </div>
        <div>
          <Card className="h-full">
            <CardContent className="h-full pt-6 w-[250px] flex flex-col justify-between">
              <div>
                {
                  state.services.map((servicePage, idx) => {
                    return <div key={idx}>
                    {servicePage.services.map((service, i) => {
                      return (
                        <div key={i} className="flex justify-between w-full">
                          <h3>{service.name}</h3> <h3>{service.price}</h3>
                        </div>
                      );
  
                    })
                  }
                    </div>
                  })
              }
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
