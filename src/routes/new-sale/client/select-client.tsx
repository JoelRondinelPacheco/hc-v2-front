import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Clients from "@/routes/clients/clients"

const SelectClient = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Select client</CardTitle>
                <CardDescription>
                <div className="flex justify-between pt-2">
                <div className="flex items-center gap-2">
                    <h3>Name:</h3>
                    <Skeleton className="w-[200px] h-[20px] rounded-sm" />
                </div>
                <div className="flex items-center gap-2">
                    <h3>DNI:</h3>
                    <Skeleton className="w-[200px] h-[20px] rounded-sm" />
                </div>
                <div className="flex items-center gap-2">
                    <h3>Email:</h3>
                    <Skeleton className="w-[200px] h-[20px] rounded-sm" />
                </div>
                </div>
                </CardDescription>
            </CardHeader>
            <CardContent>
            <Clients />
            </CardContent>
        </Card>
        
    )
}

export default SelectClient;