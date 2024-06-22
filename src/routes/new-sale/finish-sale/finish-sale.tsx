import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useNewSaleContext } from '@/context/new-sale.context'
import React from 'react'

const FinishSale = () => {
  const { state } = useNewSaleContext();
  return (
    <>
     <Card className="w-full">
      <CardHeader>
        <CardTitle>Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Card className='mb-4'>
          <CardHeader>
            <CardTitle className='text-xl'>Client</CardTitle>
            <div className="flex justify-between pt-2 text-lg">
            <div className="flex items-center gap-2 w-1/3">
              <h3>Name: </h3>
              {state.client.id === 0 ? (
                <Skeleton className="w-[200px] h-[20px] rounded-sm" />
              ) : (
                <h3>
                  {state.client.person.name} {state.client.person.lastname}
                </h3>
              )}
            </div>
            <div className="flex items-center gap-2 w-1/3">
              <h3>DNI: </h3>
              {state.client.id === 0 ? (
                <Skeleton className="w-[200px] h-[20px] rounded-sm" />
              ) : (
                <h3>{state.client.person.dni}</h3>
              )}
            </div>
            <div className="flex items-center gap-2 grow">
              <h3>Email:</h3>
              {state.client.id === 0 ? (
                <Skeleton className="w-[200px] h-[20px] rounded-sm" />
              ) : (
                <h3>{state.client.person.email}</h3>
              )}
            </div>
          </div>
          </CardHeader>
        </Card>

        <Card className='mb-4'>
          <CardHeader>
            <CardTitle className='text-xl'>Services</CardTitle>
            <div className='text-lg'>
              {state.services.map((s, i) => {
                return <div key={i}>
                  {
                    s.services.map((serv, idx) => {
                      return <p key={idx}>{serv.name}</p>
                    })
                  }
                </div>
              }
              )}
            </div>
          </CardHeader>
        </Card>
        
        <Card className='mb-4'>
          <CardHeader>
            <CardTitle className='text-xl'>Payment Method</CardTitle>
            <CardDescription className='text-lg'>
              {state.paymentMethod.type}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className='mb-4'>
          <CardHeader>
            <CardTitle className='text-xl flex justify-between'><span>Total</span><span>$ {state.totalPrice}</span></CardTitle>
          </CardHeader>
        </Card>
      </CardContent>
    </Card></>
  )
  
}

export default FinishSale