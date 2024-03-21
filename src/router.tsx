import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root/root";
import Services from "./routes/services-data/services";
import Sales from "./routes/sales/sales";
import Clients from "./routes/users/clients";
import Employee from "./routes/employees/employees";
import IndexDashboard from "./routes/dashboard/index-dashboard";
import Login from "./routes/login/login";
import Home from "./routes/root/home/home";
import PrivateRoutes from "./utils/protected-route";
import Admins from "./routes/admins/admins";
import servicesService, { ServiceEntity } from "./services/services-service";
import ErrorPage from "./error-page";
import NewService from "./routes/services-data/new-service/new-service";
import AllServices from "./routes/services-data/all-services/all-services";

const router = createBrowserRouter([
  //cualquier error se captura en error page
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
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
                path: "/services",
                element: <Services />,
                /*loader: async (): Promise<ServiceEntity[]> => {
                  const {request} = servicesService.getAll<ServiceEntity>();
                  const res = await request;
                  return res.data;
                },*/
                children: [
                  {
                    index: true,
                    loader: async (): Promise<ServiceEntity[]> => {
                      const {request} = servicesService.getAll<ServiceEntity>();
                      const res = await request;
                      return res.data;
                    },
                    element: <AllServices />

                  },
                  {
                    path: "/services/addservice",
                    element: <NewService />
                  },
                ]
              },
              
              {
                path: "/clients",
                element: <Clients />
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