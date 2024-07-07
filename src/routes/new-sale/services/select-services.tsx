import { DataTableSelect } from "@/components/data-table-select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceColumnsSelect } from "./service-columns-select";
import { useEffect } from "react";
import { useNewSaleContext } from "@/context/new-sale.context";
import { CircleX, Info } from "lucide-react";
import { PaginationState, RowSelectionState } from "@tanstack/react-table";
import { useGlobalContext } from "@/context/global-context";
import usePagination from "@/hooks/usePagination";
import { ServiceEntity } from "@/lib/service/domain/service.entity";

const SelectServices = () => {
  /*
  Iniciar con page 0
  */
  const { 
    state,
    servicesState,
    dispatchServices,
    servicesOnChangeRowSelection,
    servicesOnChangePagination,
  } = useNewSaleContext();

  const { repository, service } = useGlobalContext();

  const {
    pagination,
    setPagination, //todo llamar al pagination de context
    pageContent,
    pageCount,
    rowCount,
    updateData,
  } = usePagination<ServiceEntity>({
    initialPage: state.servicesPaginationState,
    call: service.service(repository.service).getPage
  });

  useEffect(() => {
    setPagination(servicesState.servicesPagination)
  }, [servicesState.servicesPagination])
  //setea los records por pagina
  
  
  useEffect(() => {
    dispatchServices({
      type: "SERVICES_STARTER",
      payload: pageCount
    })
  }, [pageCount])
  

  function deleteServiceFromButton(
    indexPage: number,
    indexService: number,
    itemId: number
  ) {
   
    
    dispatchServices({
      type: "REMOVE_SERVICE",
      payload: {
        indexPage: indexPage,
        indexService: indexService,
        itemId: itemId,
      },
    });
  }

  const onChangeRowHandler = (rowsUpdater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) => {
    servicesOnChangeRowSelection(rowsUpdater, pagination, pageContent);
  }
  const onPaginationChangeHandler = (paginationUpdater: PaginationState | ((old: PaginationState) => PaginationState)) => {
    servicesOnChangePagination(paginationUpdater)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Service</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 items-stretch">
        <div className="grow">
          <DataTableSelect<ServiceEntity, number>
            data={pageContent}
            multiRowSelection={true}
            columns={serviceColumnsSelect}
            pagination={servicesState.servicesPagination}
            setPagination={onPaginationChangeHandler}
            rowCount={rowCount}
            updateDataFn={updateData}
            rowSelection={servicesState.currentServicePageRecord}
            setRowSelection={onChangeRowHandler}
            pageCount={pageCount}
          />
        </div>
        <div>
          <Card className="h-full">
            <CardContent className="h-full pt-6 w-[350px] flex flex-col justify-between">
              <div>
                
                
                {servicesState.services.map((servicePage, indexPage) => {
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
