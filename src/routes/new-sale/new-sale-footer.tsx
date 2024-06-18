import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useNewSaleContext } from "@/context/new-sale.context";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const NewSaleFooter = () => {
  /*
   */
  const { state } = useNewSaleContext();
  
  const params = useLocation();

  let previousLink: string;
  let nextLink: string;
  let currentLink: string = params.pathname
  let previousBtnEnabled: boolean;
  let nextBtnEnabled: boolean;

  const clientSelected = (): boolean => {
    return state.client.id !== 0
  }

  const servicesSelected = (): boolean => {
    if (state.services[0]) {
      return state.services[0].services.length !== 0;  
    }
    return false;
  }

  const paymenthMethodSelected = (): boolean => {
    return state.paymentMethod.id !== 0;
  }

  if (currentLink.endsWith("/new-sale")) {
    previousBtnEnabled = false;
    nextBtnEnabled = clientSelected();
    previousLink="#";
    nextLink = nextBtnEnabled ? "/hc-v2-front/new-sale/services" : "#"
  } else if (currentLink.endsWith("/new-sale/services")) {
    previousBtnEnabled = true;
    nextBtnEnabled = servicesSelected();
    previousLink="/hc-v2-front/new-sale";
    nextLink= nextBtnEnabled ? "/hc-v2-front/new-sale/payment-method" : "#";
  }else if (currentLink.endsWith("/new-sale/payment-method")) {
    previousBtnEnabled = true;
    nextBtnEnabled = paymenthMethodSelected();
    previousLink = "/new-sale/services";
    nextLink = nextBtnEnabled ? "/hc-v2-front/new-sale/finish-sale" : "#";
  } else {
    previousLink="/hc-v2-front/new-sale/services";
    nextLink="/hc-v2-front/new-sale/payment-method";
    previousBtnEnabled = true;
    nextBtnEnabled = false;
  }


  

  
  const isInNewSale = params.pathname.endsWith("/new-sale")

  return (
    <>
      <div className="flex justify-between w-full">
        <Link to={previousLink}>
        <Button variant={previousBtnEnabled ? "default" : "secondary"}>Previous</Button>
        </Link>
        <Link to={nextLink}>
          <Button variant={nextBtnEnabled ? "default" : "secondary"}>Next</Button>
        </Link>
      </div>
    </>
  );
};

export default NewSaleFooter;
