import LoginCard from '@/components/login-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useGlobalContext } from '@/context/global-context'
import { AuthInfoResponse } from '@/lib/common/domain/entities/auth'
import useLogin from '@/hooks/useLogin'
import { useEffect } from 'react'

const HomeLanding = () => {

  const { dispatch } = useGlobalContext();

  const { login, error, loading, response } = useLogin(dispatch);

  const loginUserDemo = async (user: string) => {
    if (!loading) {
      await login({email: user, password: "mockPassword"})
    }
  }
  

  return (
    <div className=''>
      <section className='mb-4'>
        <h2></h2>
      </section>
      <div className='flex justify-center gap-10'>
        <section>
        <LoginCard />
        </section>
        <section>
        <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">One-click Demo account login</CardTitle>
          <CardDescription className="text-sm">Click one of the buttons below to login instantly with demo accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button className="justify-start w-full" onClick={() => loginUserDemo("employee@hcv2.com")}>
            Login as an Employee
            </Button>
            <Button className="justify-start w-full" onClick={() => loginUserDemo("admin@hcv2.com")}>
            Login as an Administrator
            </Button>
            <Button className="justify-start w-full" onClick={() => loginUserDemo("owner@hcv2.com")}>
            Login as an Owner
            </Button>
          </div>
        </CardContent>
      </Card>
        </section>
        </div>
    
    </div>
  )
}

export default HomeLanding