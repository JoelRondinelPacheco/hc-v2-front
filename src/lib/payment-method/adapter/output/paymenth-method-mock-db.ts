import { PaymentMethodEntity } from "../../domain/payment-method.entity";

const paymentMethods: PaymentMethodEntity[] = [
    {
        id: 1,
        type: "Efectivo",
        interest: 0
    },
    {
       id: 2,
       type: "Debito" ,
       interest: 0
    },
    {
       id: 3,
       type: "Credito" ,
       interest: 0.15
    },
    {
       id: 4,
       type: "Billetera virtual" ,
       interest: 0.05
    }

]

export default function paymentMethodMockData() {
   return [...paymentMethods];
}