import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


function AsideNav() {
  return (
    <Card className="max-w-[450px]">
        <CardHeader>
            <CardTitle>Menu</CardTitle>
            <CardDescription>Menu con opciones variables segun el rol</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col gap-5">
            <Button>Ventas</Button>
            <Button>Clientes</Button>
          </div>
        </CardContent>
        <CardFooter>Footer</CardFooter>
    </Card>
  )
}

export default AsideNav