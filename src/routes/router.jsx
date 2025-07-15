import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import ErrorPage from "../pages/Errorpage";
import MainLayout from "../layouts/MainLayout";
import AddBlog from "../pages/AddBlog";
import AllBlogs from "../pages/AllBlogs";
import FeaturedBlogs from "../pages/FeaturedBlogs";
import Wishlist from "../pages/Wishlist";
import BlogDetails from "../pages/BlogDetails";
import UpdateBlog from "../pages/UpdateBlog";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../provider/PrivateRoute"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/add-blog",
        element: (
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-blogs",
        element: <AllBlogs />,
      },
      {
        path: "/featured",
        element: <FeaturedBlogs />,
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/blog/:id",
        element: <BlogDetails />,
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdateBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
