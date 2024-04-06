import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Client } from "@/domain/client.domain";
import { useState } from "react";
import { Pageable, QueryParam } from "@/domain/commons.domain";
import { columnsClientsNewSales } from "./column-client";
import { DataTable } from "@/components/data-table";
import useFetchAndLoad from "@/hooks/useFetchAndLoad";
import usePagination from "@/hooks/usePagination";
import paymentMethodService from "@/services/payment-method.service";
import { PaymentMethod } from "@/domain/payment-method.domain";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "@/components/date-picker-with-range";
import { NewSaleDTO } from "@/domain/sale.domain";
import { Search } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import clientService from "@/services/client-service";
import useGet from "@/hooks/useGet";
import { NewSaleContextProvider } from "@/context/new-sale.context";

const NewSale = () => {
  const searchForm = z.object({
    name: z.string(),
  });

  type searchFormType = z.infer<typeof searchForm>;
  /*
  Client
    Si no esta seleccionado mostrar boton que abre modal. Mostrar nombre, correo y email y boton de cambiar

    Metodo de pago al final

  Service/Sale item
    Se abre lista de servicios,
    Nombre, descripcion?, cantidad, rango de fecha, precio precio total
    A la derecha boton de eliminar
  */

  const form = useForm<searchFormType>({
    resolver: zodResolver(searchForm),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: searchFormType) => {


  };

  const [clientsSearch, setClientsSearch] = useState<Client[]>([]);
  const [clientPagination, setClientPagination] = useState<Pageable>({
    pageIndex: 0,
    pageSize: 1,
  });

  const [paymentMethodPage, setPaymentMethodPage] = useState<Pageable>({
    pageIndex: 0,
    pageSize: 20,
  });

  const callFunction = paymentMethodService.getPage.bind(paymentMethodService);
  const { pageData: paymentMethodData } = usePagination({
    intialPage: paymentMethodPage,
    call: callFunction<PaymentMethod>,
  });

  const initialQuery: QueryParam[] = [
    {
      key: "pageSize",
      value: "20"
    },
    {
      key: "pageIndex",
      value: "0"
    }
  ]


  const callFunctionClients = clientService.getPageParams.bind(clientService);
  const { pageData: clientsPage, queryParams: clientQueryParams, setQueryParams: setClientQueryParams } = useGet({
    intialQuery: initialQuery,
    call: callFunctionClients<Client>,
  });

  console.log(paymentMethodData);

  const user = {
    name: "Joel Rondinel",
    email: "joel@email.com",
    dni: 123456,
  };

  const sale: NewSaleDTO = {
    employeeId: 123,
    clientId: 123,
    paymentMethodId: 123,
    saleItems: [
      {
        serviceId: 123,
        quantity: 1,
        from: new Date(),
        to: new Date(),
      },
    ],
  };

  const saleInfo = {
    client: "asd",
    employee: "asd",
    saleItems: [{}],
  };

  return (
    <NewSaleContextProvider>
    <Card>
      <CardHeader>
        <CardTitle>Dashboard New Sale</CardTitle>
      </CardHeader>
      <CardContent>
        <Card>
          <CardHeader>
            <CardTitle>Client</CardTitle>
          </CardHeader>
          <CardContent>
            <Dialog>
              <div className="flex justify-between">
                <div>
                  <div className="flex gap-6">
                    <h3>{user.name}</h3>
                    <h3>{user.email}</h3>
                  </div>
                  <h3>{user.dni}</h3>
                </div>
                <div>
                  <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                  </DialogTrigger>
                </div>
              </div>

              <DialogContent className="">
                <DialogHeader>
                  <DialogTitle>Search clients</DialogTitle>
                  <div className="grid gap-4 py-4">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} id="catf" className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button type="submit">
                        <Search />
                      </Button>
                    </form>
                  </Form>
                </div>
                </DialogHeader>
                <div>
                  <DataTable
                  columns={columnsClientsNewSales}
                  data={clientsPage}
                  pagination={clientPagination}
                  rowCount={10}
                  setPagination={setClientPagination}
                  />

                </div>
               
                <DialogFooter></DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Services</CardTitle>
          </CardHeader>
          <CardContent>
            <Card>
              <CardContent>
                <div className="flex justify-between">
                  <div>
                    <h2>Service name</h2>
                    <h3>Descrition</h3>
                  </div>

                  <div>
                    <DatePickerWithRange />
                    <Input placeholder="Quantity" defaultValue={1} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full flex justify-between">
                  <div>
                    <h3>PRECIO</h3>
                  </div>
                  <div>
                    <Button variant="destructive">Delete</Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-between">
              <div></div>
              <div>
                <Button>Nuevo</Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
    </NewSaleContextProvider>
  );
};

export default NewSale;
