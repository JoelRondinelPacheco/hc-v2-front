import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link, Outlet, useLocation } from 'react-router-dom'

const Services = () => {

  const route = useLocation()
  const isNew = route.pathname.endsWith("/new-service")

  return (
    <Card className="">
        <CardHeader>
          <div className='flex justify-between'>
            <CardTitle>Services</CardTitle>
            <Link to="/services/new-service"><Button variant={isNew ? "outline" : "default"}>New Service</Button></Link>
            </div>
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