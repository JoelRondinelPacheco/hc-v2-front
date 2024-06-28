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
import ServiceForm from "./routes/services-data/new-service/service-form";
import AllServices from "./routes/services-data/all-services/all-services";
import AllServiceError from "./routes/services-data/all-services/all-services-error";
import Clients from "./routes/clients/clients";
import Categories from "./routes/categories/categories";
import MainCategory from "./routes/categories/main-category";
import NewSale from "./routes/new-sale/new-sale";
import SelectClient from "./routes/new-sale/client/select-client";
import SelectServices from "./routes/new-sale/services/select-services";
import SelectPaymentMethod from "./routes/new-sale/payment-method/select-payment-method";
import AllClients from "./routes/clients/all-clients/all-clients";
import NewUser from "./routes/clients/new-client/new-user";
import ReportsOwner from "./routes/reports/reports";
import FinishSale from "./routes/new-sale/finish-sale/finish-sale";
import AllEmployees from "./routes/employees/all-employees/all-employees";
import NewEmployee from "./routes/employees/new-employee/new-employee";
import { GlobalContext, useGlobalContext } from "./lib/common/infrastructure/react/global-context";
import CategoryForm from "./routes/categories/new-category/category-form";
import usePagination from "./hooks/usePagination";
import { createCategoryMockRepository } from "./lib/category/infrastructure/category-mock-repository";
import { createCategoryService } from "./lib/category/application/category.service";
import { useContext, useState } from "react";


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
            element: <PrivateRoutes role="ADMINISTRATOR ADMINISTRATOR-DEMO" />,
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
                    element: <CategoryForm />,
                  },
                  {
                    path: "/hc-v2-front/category/edit/:categoryId",
                    element: <CategoryForm />,
                  }
                ],
              },
              {
                path: "/hc-v2-front/services",
                element: <Services />,
                children: [
                  {
                    index: true,
                    element: <AllServices />,
                    errorElement: <AllServiceError />,
                  },
                  {
                    path: "/hc-v2-front/services/new-service",
                    element: <ServiceForm />,
                    errorElement: <h1>ERROR</h1>
                  },
                  {
                    path: "/hc-v2-front/services/edit/:serviceId",
                    element: <ServiceForm />,
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
                    element: <NewUser />
                  },
                  {
                    path: "/hc-v2-front/clients/edit/:clientId",
                    element: <NewUser />
                  }
                ]
              },
              {
                path: "/hc-v2-front/employees",
                element: <Employee />,
                children: [
                  {
                    index: true,
                    element: <AllEmployees />
                  },
                  {
                    path: "/hc-v2-front/employees/new-employee",
                    element: <NewUser />
                  },
                  {
                    path: "/hc-v2-front/employees/edit/:employeeId",
                    element: <NewUser />
                  }
                ]
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
                  },
                  {
                    path: "/hc-v2-front/new-sale/finish-sale",
                    element: <FinishSale />
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
