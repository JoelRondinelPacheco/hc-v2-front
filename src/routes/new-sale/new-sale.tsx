import {
  Card,
  CardContent,

  CardFooter,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { NewSaleContextProvider } from "@/context/new-sale.context";
import { Link, Outlet } from "react-router-dom";
import SelectClient from "./client/select-client";
import { Button } from "@/components/ui/button";

const NewSale = () => {
/*
  Botones: 
        Si esta en clientes desactivar. Siguiente y anterior con nombre de seccion siguiente?
        Ultimo boton, vista previa modal, y confirmar
  Nombres secciones (client, services...): Subtitulo rojo si falta?

  */




  return (
    <NewSaleContextProvider>
    <Card>
      <CardHeader>
        <CardTitle>New Sale</CardTitle>
        Client | Services | Payment Method
      </CardHeader>
      <CardContent>
      <Outlet />
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
        <Button>Previous </Button>
        <Link to="/new-sale/services"><Button>Next</Button></Link>
        </div>
      </CardFooter>
    </Card>
    </NewSaleContextProvider>
  );
};

export default NewSale;
