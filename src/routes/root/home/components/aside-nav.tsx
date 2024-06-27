import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useGlobalContext } from "@/lib/common/infraestructure/react/auth-context";
import { Link } from "react-router-dom";


type navInfo = {
  name: string,
  url: string
}

const menusAdmin: navInfo[] = [
  {
    name: "Categories",
    url: "/hc-v2-front/"
  },
  {
    name: "Services",
    url: "/hc-v2-front/services"
  },
  {
    name: "Clients",
    url: "/hc-v2-front/clients"
  },
  {
    name: "Employees",
    url: "/hc-v2-front/employees"
  }
]
const menusEmployee: navInfo[] = [
  {
    name: "New Sale",
    url: "/hc-v2-front/"
  },
  {
    name: "My Sales",
    url: "/hc-v2-front/my-sales"
  }
]
const menusOwner: navInfo[] = [
  {
    name: "Informe",
    url: "/hc-v2-front/"
  },
  {
    name: "Administrators",
    url: "/hc-v2-front/admins"
  }
]

function getNavInfo(role: "ADMINISTRATOR" | "ADMINISTRATOR-DEMO" | "EMPLOYEE" | "EMPLOYEE-DEMO" | "OWNER" | "OWNER-DEMO" | "NONE") {
  switch(role) {
    case "ADMINISTRATOR":
      return menusAdmin;
    case "ADMINISTRATOR-DEMO":
      return menusAdmin;
    case "EMPLOYEE":
      return menusEmployee;
    case "EMPLOYEE-DEMO":
      return menusEmployee;
    default:
      return menusOwner;
  }
}

function AsideNav() {

  const { state } = useGlobalContext();

  const menus: navInfo[] = getNavInfo(state.role);

  return (
    <Card className="min-w-[300px] h-full">
        <CardHeader>
            <CardTitle>Menu</CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col gap-5">
            {
              menus.map((menu, idx) => {
                return <Link key={idx} to={menu.url}><Button className="w-full">{menu.name}</Button></Link>
              })
            }
          </div>
        </CardContent>
    </Card>
  )
}

export default AsideNav