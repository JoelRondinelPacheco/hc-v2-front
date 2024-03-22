import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link, Outlet } from 'react-router-dom'

const Services = () => {


  return (
    <Card className="">
        <CardHeader>
            <CardTitle>Services</CardTitle>
            <Link to="/services/addservice">new service</Link>
            <CardDescription>Dashboard segun el la tarea que eligio el usuario</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col gap-5">
            <Outlet />
            </div>
        </CardContent>
    </Card>
  )
}

export default Services