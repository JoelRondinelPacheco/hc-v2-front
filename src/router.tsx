import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root/root";
import Services from "./routes/services-data/services";
import Sales from "./routes/sales/sales";
import Employee from "./routes/employees/employees";
import IndexDashboard from "./routes/dashboard/index-dashboard";
import Login from "./routes/login/login";
import Home from "./routes/root/home/home";
import PrivateRoutes from "./utils/protected-route";
import Admins from "./routes/admins/admins";
import ErrorPage from "./error-page";
import NewService from "./routes/services-data/new-service/new-service";
import AllServices from "./routes/services-data/all-services/all-services";
import categoryService from "./services/category-service";
import { CategoryEntity } from "./domain/category.domain";
import AllServiceError from "./routes/services-data/all-services/all-services-error";
import Clients from "./routes/clients/clients";
import NewCategory from "./routes/categories/new-category/new-category";
import Categories from "./routes/categories/categories";
import MainCategory from "./routes/categories/main-category";
import NewSale from "./routes/new-sale/new-sale";
import SelectClient from "./routes/new-sale/client/select-client";
import SelectServices from "./routes/new-sale/services/select-services";
import SelectPaymentMethod from "./routes/new-sale/payment-method/select-payment-method";
import AllClients from "./routes/clients/all-clients/all-clients";
import NewClient from "./routes/clients/new-client/new-client";
import ReportsOwner from "./routes/reports/reports";

const router = createBrowserRouter([
  //cualquier error se captura en error page
  {
    path: "/hc-v2-front",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        //tiene el outlet, lleva children, protegerla?
        path: "/hc-v2-front/",
        element: <Home />,
        children: [
          {
            index: true,
            element: <IndexDashboard />,
          },
          {
            element: <PrivateRoutes role="ADMIN ADMIN-DEMO" />,
            children: [
              {
                path: "/hc-v2-front/category",
                element: <Categories />,
                children: [
                  {
                    index: true,
                    element: <MainCategory />,
                  },
                  {
                    path: "/hc-v2-front/category/new-category",
                    element: <NewCategory />,
                  },
                ],
              },
              {
                path: "/hc-v2-front/services",
                element: <Services />,
                children: [
                  {
                    index: true,
                   // loader: allServicesLoader,
                    element: <AllServices />,
                    errorElement: <AllServiceError />,
                  },
                  {
                    path: "/hc-v2-front/services/new-service",
                    element: <NewService />,
                    errorElement: <h1>ERROR</h1>
                  },
                ],
              },

              {
                path: "/hc-v2-front/clients",
                element: <Clients />,
                children: [
                  {
                    index: true,
                    element: <AllClients />
                  },
                  {
                    path: "/hc-v2-front/clients/new-client",
                    element: <NewClient />
                  }
                ]
              },
              {
                path: "/hc-v2-front/employees",
                element: <Employee />,
              },
            ],
          },
          {
            element: <PrivateRoutes role="EMPLOYEE EMPLOYEE-DEMO" />,
            children: [
              {
                path: "/hc-v2-front/new-sale",
                element: <NewSale />,
                children: [
                  {
                    index: true,
                    element: <SelectClient />,
                  },
                  {
                    path: "/hc-v2-front/new-sale/services",
                    element: <SelectServices />,
                  },
                  {
                    path: "/hc-v2-front/new-sale/payment-method",
                    element: <SelectPaymentMethod />
                  }
                ],
              },
              {
                path: "/hc-v2-front/my-sales",
                element: <Sales />,
              },
            ],
          },
          {
            element: <PrivateRoutes role="OWNER OWNER-DEMO" />,
            children: [
              {
                path: "/hc-v2-front/reports",
                element: <ReportsOwner />,
              },
              {
                path: "/hc-v2-front/admins",
                element: <Admins />,
              },
            ],
          },
        ],
      },
      {
        path: "/hc-v2-front/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
