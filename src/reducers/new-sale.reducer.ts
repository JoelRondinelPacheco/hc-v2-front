import { PaymentMethodEntity } from "@/lib/payment-method/domain/payment-method.entity";
import { NewSaleContextState, ServicesPage } from "@/lib/sales/domain/sale.domain";

export type ServicoIndexInfo = {
    indexPage: number,
    indexService: number,
    itemId: number,
}


type PaymentMethodSelectionPayload = {
    paymentMethodSelection: Record<string, boolean>,
    paymentMethod: PaymentMethodEntity,
    services: ServicesPage[];
}

type PaymentMethodSelection = {
    type: "PAYMENT_METHOD_SELECTION",
    payload: PaymentMethodSelectionPayload
}

interface FinishSale {
    type: 'FINISH_SALE'
}

interface SetPrice {
    type: "SET_PRICE",
    payload: ServicesPage[]
}

export type NewSaleReducerAction = FinishSale | PaymentMethodSelection | SetPrice

export type NewSaleReducerType = (state: NewSaleContextState, action: NewSaleReducerAction) => NewSaleContextState

const newSaleReducer: NewSaleReducerType = (state, action) => {
    switch(action.type) {
        case "SET_PRICE":
            return {
                ...state,
                totalPrice: calcFinalPrice(action.payload, state.paymentMethod)
            }
        case "FINISH_SALE":
            let saleValidtor = validateFinishSale(state);
            return saleValidtor ? {...state, done: true} : {...state};
        case "PAYMENT_METHOD_SELECTION":
            return {
                    ...state,
                    paymentMethodSelection: action.payload.paymentMethodSelection,
                    paymentMethod: {...action.payload.paymentMethod},
                    totalPrice: calcFinalPrice(action.payload.services, action.payload.paymentMethod)}
        default:
            return {...state};
    }
}


function calcFinalPrice(services: ServicesPage[], paymentMethod: PaymentMethodEntity) {
    let price = 0;
    services.forEach((s) => {
        s.services.forEach((serv) => price += serv.price)
    })
    if (paymentMethod && paymentMethod.id !== 0) {
        let p = Number.parseFloat(String(price * (paymentMethod.interest + 1))).toFixed(2)
        price = Number(Number.parseFloat(String(price * (paymentMethod.interest + 1))).toFixed(2));
    }
    return price;
}

function validateFinishSale(state: NewSaleContextState): boolean {
    return true;
}

export default newSaleReducer;