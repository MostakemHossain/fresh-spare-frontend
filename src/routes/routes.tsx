import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MinimalLayout from "../components/layout/MinimalLayout";
import NotFound from "../pages/404Page";
import AuthLayout from "../pages/Auth";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [],
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
    path: "/auth",
    element: <AuthLayout />,
  },

  {
    path: "/user",
    element: <App />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
