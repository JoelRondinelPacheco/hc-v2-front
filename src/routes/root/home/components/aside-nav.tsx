import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthContext } from "@/context/auth-context";
import { Link } from "react-router-dom";


type navInfo = {
  name: string,
  url: string
}

const menusAdmin: navInfo[] = [
  {
    name: "Categories",
    url: "/"
  },
  {
    name: "Services",
    url: "/services"
  },
  {
    name: "Clients",
    url: "/clients"
  },
  {
    name: "Employees",
    url: "/employees"
  }
]
const menusEmployee: navInfo[] = [
  {
    name: "New Sale",
    url: "/"
  },
  {
    name: "My Sales",
    url: "/my-sales"
  }
]
const menusOwner: navInfo[] = [
  {
    name: "Informe",
    url: "/"
  },
  {
    name: "Administrators",
    url: "/admins"
  }
]

function getNavInfo(role: "ADMIN" | "EMPLOYEE" | "OWNER" | "NONE") {
  switch(role) {
    case "ADMIN":
      return menusAdmin;
      break;
    case "EMPLOYEE":
      return menusEmployee;
      break;
    default:
      return menusOwner;
  }
}

function AsideNav() {

  const { state } = useAuthContext();

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