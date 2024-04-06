import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Clients from "@/routes/clients/clients"

const SelectClient = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Select client</CardTitle>
            </CardHeader>
            <CardContent>
            <Clients />
            </CardContent>
        </Card>
        
    )
}

export default SelectClient;