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
import { allServicesLoader } from "./loaders/services.loader";
import NewSale from "./routes/new-sale/new-sale";
import SelectClient from "./routes/new-sale/client/select-client";
import SelectServices from "./routes/new-sale/services/select-services";
import SelectPaymentMethod from "./routes/new-sale/payment-method/select-payment-method";

const router = createBrowserRouter([
  //cualquier error se captura en error page
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        //tiene el outlet, lleva children, protegerla?
        path: "/",
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
                path: "/category",
                element: <Categories />,
                children: [
                  {
                    index: true,
                    element: <MainCategory />,
                  },
                  {
                    path: "/category/new-category",
                    element: <NewCategory />,
                  },
                ],
              },
              {
                path: "/services",
                element: <Services />,
                children: [
                  {
                    index: true,
                   // loader: allServicesLoader,
                    element: <AllServices />,
                    errorElement: <AllServiceError />,
                  },
                  {
                    path: "/services/new-service",
                    element: <NewService />,
                    errorElement: <h1>ERROR</h1>
                  },
                ],
              },

              {
                path: "/clients",
                element: <Clients />,
              },
              {
                path: "/employees",
                element: <Employee />,
              },
            ],
          },
          {
            element: <PrivateRoutes role="EMPLOYEE EMPLOYEE-DEMO" />,
            children: [
              {
                path: "/new-sale",
                element: <NewSale />,
                children: [
                  {
                    index: true,
                    element: <SelectClient />,
                  },
                  {
                    path: "/new-sale/services",
                    element: <SelectServices />,
                  },
                  {
                    path: "/new-sale/payment-method",
                    element: <SelectPaymentMethod />
                  }
                ],
              },
              {
                path: "/my-sales",
                element: <Sales />,
              },
            ],
          },
          {
            element: <PrivateRoutes role="OWNER OWNER-DEMO" />,
            children: [
              {
                path: "/admins",
                element: <Admins />,
              },
            ],
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
