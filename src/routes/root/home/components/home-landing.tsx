import LoginCard from '@/components/login-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const HomeLanding = () => {
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
            <Button className="justify-start w-full">
            Login as Employee
            </Button>
            <Button className="justify-start w-full">
            Login as Administrator
            </Button>
            <Button className="justify-start w-full">
            Login as Owner
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