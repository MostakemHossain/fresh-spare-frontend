import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MinimalLayout from "../components/layout/MinimalLayout";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import ProductDisplayPage from "../components/ProductDisplayPage";
import NotFound from "../pages/404Page";
import AuthLayout from "../pages/Auth";
import Checkout from "../pages/Checkout";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import OTPVerification from "../pages/OTPVerification";
import ProductListPage from "../pages/ProductListPage";
import ResetPassword from "../pages/ResetPassword";
import SearchPage from "../pages/SearchPage";
import Success from "../pages/Success";
import UserMenuMobile from "../pages/UserMenuMobile";
import { routeGenerator } from "../utils/routes-generator";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";

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
    path: "product/:product",
    element: <ProductDisplayPage />,
  },

  {
    path: "/:category/:sub-category",
    element: <ProductListPage />,
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
    path: "/checkout",
    element: (
      <MinimalLayout>
        <div className="min-h-screen">
          <Checkout />
        </div>
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
    path: "/success",
    element: <Success />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
  },

  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths),
  },
  {
    path: "/admin",
    element: (
      <>
        <App />
      </>
    ),
    children: routeGenerator(adminPaths),
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
