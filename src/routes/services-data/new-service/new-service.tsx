import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

function NewService() {
    console.log("NADASDSS")
  return (
    <Card className="">
    <CardHeader>
        <CardTitle>Services</CardTitle>
        <CardDescription>dash new service</CardDescription>
    </CardHeader>
    
    <CardContent>
      <div className="flex flex-col gap-5">
        CONTENT
        </div>
    </CardContent>
</Card>
  )
}

export default NewService