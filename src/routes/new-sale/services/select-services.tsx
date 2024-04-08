import { DataTableSelect } from "@/components/data-table-select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceColumnsSelect } from "./service-columns-select";
import { useEffect, useState } from "react";
import servicesService from "@/services/services-service";
import usePagination from "@/hooks/usePagination";
import { ServiceEntity } from "@/domain/service.domain";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewSaleContext } from "@/context/new-sale.context";

const SelectServices = () => {
  const { state, dispatch } = useNewSaleContext();
  const [total, setTotal] = useState<number>(0)

  const intialPage = {
    pageIndex: 0,
    pageSize: 5,
  };

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let services: ServiceEntity[] = [];

    console.log(rowSelection);

    for (const id in rowSelection) {
      console.log("ID: " + id);

      let service: ServiceEntity | undefined = pageData.find(
        (data) => data.id === Number(id) + 1
      );
      console.log(service);
      if (service) {
        console.log("ENTRO");
        services.push(service);
      }
    }
    console.log("DISPATCH");
    console.log(services);

    let total: number = 0;
    for (const data of services) {
        total += data.price
    }

    setTotal(total)

    dispatch({
      type: "ADD_SERVICE",
      payload: services,
    });
  }, [rowSelection]);

  const callFunction = servicesService.getPage.bind(servicesService);

  const { pagination, setPagination, pageData, rowCount, updateData } =
    usePagination<ServiceEntity>({
      intialPage: intialPage,
      call: callFunction,
    });

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
        <div >
          <Card className="h-full">
            <CardContent className="h-full pt-6 w-[250px] flex flex-col justify-between">
                <div>
              {state.services.map((service, idx) => {
                return (
                  <div key={idx} className="flex justify-between w-full">
                    <h3>{service.name}</h3> <h3>{service.price}</h3>
                  </div>
                );
              })}
              </div>
              <div className="flex justify-between w-full">
              <h3>Total:</h3><h3>{total}</h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelectServices;
