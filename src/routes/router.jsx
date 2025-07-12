import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import ErrorPage from "../pages/Errorpage";
import MainLayout from "../layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      }
    ],
  },
]);

export default router;
