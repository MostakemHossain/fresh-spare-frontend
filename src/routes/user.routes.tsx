import Profile from "../pages/Profile";
import Address from "../pages/users/Address";
import MyOrder from "../pages/users/MyOrder";
import UserDashboard from "../pages/users/UserDashboard";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
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
    element: <Profile />,
  },
];
