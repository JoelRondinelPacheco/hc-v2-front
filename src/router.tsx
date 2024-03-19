import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root/root";
import ErrorPage from "./error-page";
import NewSale from "./routes/new-sale/new-sale";
import Products from "./routes/products/products";
import Sales from "./routes/sales/sales";
import Reports from "./routes/reports/reports";
import Users from "./routes/users/users";
import Employee from "./routes/employees/employees";
import IndexDashboard from "./routes/dashboard/index-dashboard";
import Login from "./routes/login/login";
import Home from "./routes/root/home/home";
import PrivateRoutes from "./utils/protected-route";
import Admins from "./routes/admins/admins";

const router = createBrowserRouter([
  //todo, reenviar sign in page por defecto.
  //el home es el nuevo dashboard
 
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        //tiene el outlet, lleva children, protegerla?
        path: "/",
        element: <Home />,
        children: [
          {
            //seleccionador por defecto segun el rol, es el index
            index: true,
            element: <IndexDashboard />
          },
          {
            element: <PrivateRoutes role="ADMIN" />,
            children: [
              {
                path: "/products",
                element: <Products />
              },
              {
                path: "/users",
                element: <Users />
              },
              {
                path: "/employees",
                element: <Employee />
              }
            ]
          },
          {
            element: <PrivateRoutes role="EMPLOYEE" />,
            children: [
              {
                path: "/my-sales",
                element: <Sales />
              }
            ]
          },
          {
            element: <PrivateRoutes role="OWNER" />,
            children: [
              {
                path: "/admins",
                element: <Admins />
              }
            ]
          }
          /*
          esto esta bien
          {
            //admin
            path: "/products",
            element: <Products />
          },
          {
            //employee
            path: "/my-sales",
            element: <Sales />
          },
          {
            //owner
            path: "/admins",
            element: <Admins />
          }*/
        ]
      },
      {
        path: "/login",
        element: <Login />
      }
    ]
  },
  
  

])

export default router;