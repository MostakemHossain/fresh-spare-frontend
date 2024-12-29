import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MinimalLayout from "../components/layout/MinimalLayout";
import NotFound from "../pages/404Page";
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
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
