import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AllServices from "@/routes/services-data/all-services/all-services";


const SelectPaymentMethod = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
            <AllServices />
            </CardContent>
        </Card>
        
    )
}

export default SelectPaymentMethod;