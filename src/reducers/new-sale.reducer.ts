import { ClientEntity } from "@/domain/client.domain";
import { Pageable } from "@/domain/commons.domain";
import { PaymentMethodEntity } from "@/domain/payment-method.domain";
import { NewSaleContextState, RecordPage, ServicesPage } from "@/domain/sale.domain";
import { ServiceEntity } from "@/domain/service.domain";
import { servicesSelectedByPage } from "./reducer.utils";

export type ServicoIndexInfo = {
    indexPage: number,
    indexService: number,
    itemId: number,
}

type UpdateServicesPayload = {
    pageIndex: number,
    services: ServiceEntity[]
}

type UpdateSelectionPayload = {
    recordPage: RecordPage
    services: ServiceEntity[],
}

type PaymentMethodSelectionPayload = {
    paymentMethodSelection: Record<string, boolean>,
    paymentMethod: PaymentMethodEntity,
}

type PaymentMethodSelection = {
    type: "PAYMENT_METHOD_SELECTION",
    payload: PaymentMethodSelectionPayload
}

interface FinishSale {
    type: 'FINISH_SALE'
}

interface UpdatetSelection {
    type: 'UPDATE_SELECTION',
    //recibir el index para actualizar el record, el index con los nuevos servicios en ese index
    payload: UpdateSelectionPayload
}

interface UpdatetServicesByPage {
    type: 'UPDATE_SERVICES_BY_PAGE',
    //recibir el index para actualizar el record, el index con los nuevos servicios en ese index
    payload: UpdateServicesPayload
}

export type NewSaleReducerAction = FinishSale | PaymentMethodSelection | UpdatetServicesByPage | UpdatetSelection

export type NewSaleReducerType = (state: NewSaleContextState, action: NewSaleReducerAction) => NewSaleContextState

const newSaleReducer: NewSaleReducerType = (state, action) => {
    switch(action.type) {
        case "FINISH_SALE":
            let saleValidtor = validateFinishSale(state);
            return saleValidtor ? {...state, done: true} : {...state};
        case "PAYMENT_METHOD_SELECTION":
            return {...state, paymentMethodSelection: action.payload.paymentMethodSelection, paymentMethod: action.payload.paymentMethod, totalPrice: calcFinalPrice(state.services, state.paymentMethod)}
        default:
            return {...state};
    }
}


function calcFinalPrice(services: ServicesPage[], paymentMethod?: PaymentMethodEntity) {
    let price = 0;
    services.forEach((s) => {
        s.services.forEach((serv) => price += serv.price)
    })
    
    if (paymentMethod && paymentMethod.id !== 0) {
        price = Number(Number.parseFloat(String(Number(price) * Number(paymentMethod.interest + 1))).toFixed(2));
    }

    return price;
}

function validateFinishSale(state: NewSaleContextState): boolean {
    return true;
}

export default newSaleReducer;