import AdminDashboardChart from "./Chart";
import DashboardMetrics from "./DashboardMatrics";
import RecentOrders from "./RecentOrder";
import TopCategoriesAndNewCustomers from "./TopCategoriesAndNewCustomers";

const AdminDashboard = () => {
  return (
    <div>
      <DashboardMetrics />
      <AdminDashboardChart/>
      <RecentOrders />
      <TopCategoriesAndNewCustomers />
    </div>
  );
};

export default AdminDashboard;
