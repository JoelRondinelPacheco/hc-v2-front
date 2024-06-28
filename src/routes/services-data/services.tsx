import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useIsTableList from '@/hooks/useIsTableList'
import { Link, Outlet, useLocation } from 'react-router-dom'

const Services = () => {

  const { isList } = useIsTableList({
    newForm: "new-service",
    editForm: "edit"
})

  return (
    <Card className='mb-4'>
        <CardHeader>
          <div className='flex justify-between'>
            <CardTitle>Services</CardTitle>
            {
              isList &&
              <Link to="/hc-v2-front/services/new-service"><Button variant="default">New Service</Button></Link>
            }
            
            </div>
        </CardHeader>
        
        <CardContent>
            <Outlet />
        </CardContent>
    </Card>
  )
}

export default Services