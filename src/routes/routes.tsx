import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import NotFound from "../pages/404Page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
