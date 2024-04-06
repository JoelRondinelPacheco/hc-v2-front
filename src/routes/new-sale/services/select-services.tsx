import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AllServices from "@/routes/services-data/all-services/all-services";


const SelectServices = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Select Service</CardTitle>
            </CardHeader>
            <CardContent>
            <AllServices />
            </CardContent>
        </Card>
        
    )
}

export default SelectServices;