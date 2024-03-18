import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root/root";
import ErrorPage from "./error-page";
import Home from "./routes/root/home/home";
import Categories from "./routes/categories/categories";
import NewSale from "./routes/new-sale/new-sale";
import Products from "./routes/products/products";
import Dashboard from "./routes/dashboard/dashboard";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home></Home>
        },
        {
          path: "/admin",
          element: <Dashboard />,
          children:  [
            {
              //fijarse si se puede hacer /categories y /categoryes/:id
              index: true,
              element: <Categories />
            },
            {
              path: "/admin/products",
              element: <Products />
            },
            {
              path: "/admin/users",
              element: <Products />
            },
            {
              path: "/admin/employees",
              element: <Products />
            }
          ]
        },
       
      ]
    }
])

export default router;