import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const ReportsOwner = () => {

  console.log("REPOTRTS")

  return (
    <Card >
    <CardHeader>
        <CardTitle>Dashboard REPORTS</CardTitle>
        <CardDescription>Dashboard segun el la tarea que eligio el usuario</CardDescription>
    </CardHeader>
    
    <CardContent>
      <div className="flex flex-col gap-5">
        </div>
    </CardContent>
</Card>
  )
}

export default ReportsOwner