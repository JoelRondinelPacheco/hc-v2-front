import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const Dashboard = () => {
  return (
    <Card className="max-w-[450px]">
        <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>Dashboard segun el la tarea que eligio el usuario</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col gap-5">
            </div>
        </CardContent>
    </Card>
  )
}

export default Dashboard