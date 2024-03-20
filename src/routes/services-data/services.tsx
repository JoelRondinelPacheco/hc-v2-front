import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import create from '@/services/http-service';
import servicesService, { ServiceEntity } from '@/services/services-service';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom'

const Services = () => {

  const data = useLoaderData() as ServiceEntity[];

  return (
    <Card className="max-w-[450px]">
        <CardHeader>
            <CardTitle>Dashboard Products</CardTitle>
            <CardDescription>Dashboard segun el la tarea que eligio el usuario</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col gap-5">
            { data.map((s, i) => {
                return <div key={i}>
                  <h2>{s.name}</h2>
                  <h2>{s.category.name}</h2>
                </div>
              })
            }
            </div>
        </CardContent>
    </Card>
  )
}

export default Services