import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/global-context";
import { useNewSaleContext } from "@/context/new-sale.context";
import usePost from "@/hooks/usePost";
import { CreateSaleRequest, SaleItemDTO } from "@/lib/sales/domain/sale.domain";
import { Link, useLocation } from "react-router-dom";

const NewSaleFooter = () => {
  /*
   */
  const {
        state,
        clientsState,
        servicesState,
        dispatch,
        isSaleOk
      } = useNewSaleContext();
  const { repository, service } = useGlobalContext();
/*
  const { doPost, loading, error, response } = usePost<NewSaleDTO, SaleEntity>(
    service(repository.),
    "/sale"
  );
*/
  
  const params = useLocation();

  let previousLink: string;
  let nextLink: string;
  let currentLink: string = params.pathname
  let previousBtnEnabled: boolean;
  let nextBtnEnabled: boolean;
  let nextBtnText = "Next";

  const clientSelected = (): boolean => {

    return clientsState.client.id !== 0

  }

  const servicesSelected = (): boolean => {
    if (servicesState.services[0]) {
      return servicesState.services[0].services.length !== 0;  
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
    previousLink = "/hc-v2-front/new-sale/services";
    nextLink = nextBtnEnabled ? "/hc-v2-front/new-sale/finish-sale" : "#";
  } else {
    previousLink="/hc-v2-front/new-sale/payment-method";
    nextLink="#";
    nextBtnText = "Finish Sale"
    previousBtnEnabled = true;
    nextBtnEnabled = true;
  }

  if(state.done) {
    nextBtnText = "New Sale";
    nextLink = "/hc-v2-front/new-sale";
  }
/*
  const finishSale = () => {
    if (!loading && isSaleOk()) {
    doPost(getSaleInfoFromState());    
  }
}

useEffect(() => {
  if (response !== null && !loading && !error) {
    if (!loading && !error){
      dispatch({
        type: "FINISH_SALE"
      })
    }
  }
}, [response])
*/
function getSaleInfoFromState(): CreateSaleRequest {
  let saleItems: SaleItemDTO[] = [] ;
  for (let i=0; i < state.services.length; i++) {
    state.services[i].services.forEach(s => {
        saleItems.push({
          serviceId: s.id,
          quantity: 1,
          from: new Date(),
          to: new Date()
        })
    });
  }
  return {
    paymentMethodId: state.paymentMethod.id,
    clientId: state.client.id,
    employeeId: state.employeeId,
    saleItems: saleItems,
  }
}
  
  const isInNewSale = params.pathname.endsWith("/new-sale")

  return (
    <>
      <div className="flex justify-between w-full">
        { !state.done &&
        <Link to={previousLink}>
        <Button variant={previousBtnEnabled ? "default" : "secondary"}>Previous</Button>
        </Link>
        }
        <Link to={nextLink}>
          {
            currentLink.endsWith("/hc-v2-front/new-sale/finish-sale") 
              ? <Button variant={nextBtnEnabled ? "default" : "secondary"} className="hover:text-white hover:bg-green-800" onClick={() =>{}}>{nextBtnText}</Button>
              : <Button variant={nextBtnEnabled ? "default" : "secondary"}>{nextBtnText}</Button>
          } 
        </Link>
      </div>
    </>
  );
};

export default NewSaleFooter;
