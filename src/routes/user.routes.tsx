import Home from "../pages/Home";
import Address from "../pages/users/Address";
import MyOrder from "../pages/users/MyOrder";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Home />,
  },
  {
    name: "My orders",
    path: "my-orders",
    element: <MyOrder />,
  },
  {
    name: "Save Address",
    path: "address",
    element: <Address />,
  },
  {
    name: "Profile",
    path: "profile",
    element: <Home />,
  },
];
