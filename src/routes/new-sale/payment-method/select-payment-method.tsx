import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AllServices from "@/routes/services-data/all-services/all-services";
import AllPaymentMethod from "./all-payment-method";


const SelectPaymentMethod = () => {
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
            <AllPaymentMethod />
            </CardContent>
        </Card>
        
    )
}

export default SelectPaymentMethod;