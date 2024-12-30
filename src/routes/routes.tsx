import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MinimalLayout from "../components/layout/MinimalLayout";
import NotFound from "../pages/404Page";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Category from "../pages/admin/Category";
import Orders from "../pages/admin/Orders";
import Product from "../pages/admin/Product";
import SubCategory from "../pages/admin/SubCategory";
import UploadProduct from "../pages/admin/UploadProduct";
import AuthLayout from "../pages/Auth";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import OTPVerification from "../pages/OTPVerification";
import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";
import SearchPage from "../pages/SearchPage";
import UserMenuMobile from "../pages/UserMenuMobile";
import Address from "../pages/users/Address";
import MyOrder from "../pages/users/MyOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/user",
        element: <UserMenuMobile />,
      },
    ],
  },
  {
    path: "/search",
    element: (
      <MinimalLayout>
        <SearchPage />
      </MinimalLayout>
    ),
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verification-otp",
    element: <OTPVerification />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
  },

  {
    path: "/dashboard",
    element: <App />,
    children: [
      {
        path: "/dashboard/user/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/user/my-orders",
        element: <MyOrder />,
      },
      {
        path: "/dashboard/user/address",
        element: <Address />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <App />,
    children: [
      {
        path: "/dashboard/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/dashboard/admin/category",
        element: <Category />,
      },
      {
        path: "/dashboard/admin/sub-category",
        element: <SubCategory />,
      },
      {
        path: "/dashboard/admin/add-product",
        element: <UploadProduct />,
      },
      {
        path: "/dashboard/admin/product",
        element: <Product />,
      },
      {
        path: "/dashboard/admin/orders",
        element: <Orders />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
