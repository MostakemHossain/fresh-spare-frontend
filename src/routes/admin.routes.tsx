import AdminDashboard from "../pages/admin/AdminDashboard";
import Category from "../pages/admin/Category";
import Orders from "../pages/admin/Orders";
import Product from "../pages/admin/Product";
import SubCategory from "../pages/admin/SubCategory";
import UploadProduct from "../pages/admin/UploadProduct";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Category",
    path: "category",
    element: <Category />,
  },
  {
    name: "Sub Category",
    path: "sub-category",
    element: <SubCategory />,
  },
  {
    name: "Add Product",
    path: "add-product",
    element: <UploadProduct />,
  },
  {
    name: "Product",
    path: "product",
    element: <Product />,
  },
  {
    name: "Orders",
    path: "orders",
    element: <Orders />,
  },
];
