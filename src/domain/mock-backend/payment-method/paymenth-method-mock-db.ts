import { PaymentMethodEntity } from "@/domain/payment-method.domain";

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
       interest: 0.10
    },
    {
       id: 4,
       type: "Billetera virtual" ,
       interest: 0.5
    }

]

export default function paymentMethodMockData() {
   return [...paymentMethods];
}