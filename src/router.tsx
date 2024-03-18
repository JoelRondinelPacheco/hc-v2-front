import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root/root";
import ErrorPage from "./error-page";
import Home from "./routes/root/home/home";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home></Home>
        }
      ]
    },
])

export default router;