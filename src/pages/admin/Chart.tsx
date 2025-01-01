import { Card } from "antd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const dataSales = [
  { name: "December", sales: 4000 },
  { name: "November", sales: 3000 },
  { name: "October", sales: 5000 },
  { name: "September", sales: 2000 },
  { name: "August", sales: 2780 },
  { name: "July", sales: 4000 },
];

const dataOrders = [
  { name: "December", orders: 12 },
  { name: "November", orders: 20 },
  { name: "October", orders: 19 },
  { name: "September", orders: 11 },
  { name: "August", orders: 22 },
  { name: "July", orders: 13 },
];

const AdminDashboardChart = () => {
  return (
    <div className="p-6 bg-gray-100 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Sales Line Chart Card */}
        <Card title="Sales Over Time" bordered={false} className="shadow-lg">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataSales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Total Orders Bar Chart Card */}
        <Card
          title="Total Orders Over Time"
          bordered={false}
          className="shadow-lg"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataOrders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardChart;
