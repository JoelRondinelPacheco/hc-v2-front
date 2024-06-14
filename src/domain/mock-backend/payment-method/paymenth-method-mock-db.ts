import { PaymentMethod } from "@/domain/payment-method.domain";

export const paymentMethods: PaymentMethod[] = [
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