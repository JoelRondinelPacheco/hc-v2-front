import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import UnderConstruction from '@/components/under-construction'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Employee = () => {
  return (
    <Card className='mb-4'>
    <CardHeader>
      <div className='flex justify-between'>
        <CardTitle>Employees</CardTitle>
        <Link to="/hc-v2-front/employees/new-employee"><Button variant="outline">New Employee</Button></Link>
        </div>
    </CardHeader>
    <CardContent>
    <Outlet />
    </CardContent>
</Card>
  )
}

export default Employee