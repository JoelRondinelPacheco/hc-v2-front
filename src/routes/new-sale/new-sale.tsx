import {
  Card,
  CardContent,

  CardFooter,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Outlet } from "react-router-dom";
import { NewSaleContextProvider } from "@/context/new-sale.context";
import NewSaleFooter from "./new-sale-footer";

const NewSale = () => {
/*
  Botones: 
        Si esta en clientes desactivar. Siguiente y anterior con nombre de seccion siguiente?
        Ultimo boton, vista previa modal, y confirmar
  Nombres secciones (client, services...): Subtitulo rojo si falta?
      bOTON SECCION ANTERIOR

  */
  
//state.client.id


  return (
    <NewSaleContextProvider>
    <Card>
      <CardHeader>
        <CardTitle>New Sale</CardTitle>
      </CardHeader>
      <CardContent>
      <Outlet />
      </CardContent>
      <CardFooter>
      <NewSaleFooter />
      </CardFooter>
    </Card>
    </NewSaleContextProvider>
  );
};

export default NewSale;
