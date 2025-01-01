import { Card, Col, Row, Statistic, Typography } from "antd";
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

// Sample data for charts
const orderData = [
  { name: "January", orders: 5 },
  { name: "February", orders: 8 },
  { name: "March", orders: 4 },
  { name: "April", orders: 7 },
  { name: "May", orders: 9 },
  { name: "June", orders: 6 },
];

const purchaseData = [
  { name: "January", purchase: 120 },
  { name: "February", purchase: 150 },
  { name: "March", purchase: 80 },
  { name: "April", purchase: 200 },
  { name: "May", purchase: 250 },
  { name: "June", purchase: 170 },
];

const { Title } = Typography;

const UserDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 w-full">
      
      <div
        className="relative bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-700 text-white p-12 rounded-lg mb-6 shadow-lg"
       
      >
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
        <div className="relative z-10 flex items-center">
          <img
            src="https://via.placeholder.com/150"
            alt="User"
            className="w-20 h-20 rounded-full border-4 border-white mr-6"
          />
          <div>
            <Title level={2} className="text-white font-bold">
              Welcome, John Doe!
            </Title>
            <p className="text-lg font-bold">
              We're glad to have you back! Here's your dashboard overview.
            </p>
          </div>
        </div>
      </div>

      {/* User Stats Section */}
      <Row gutter={16} className="mb-6">
        <Col span={8}>
          <Card
            title={<span className="font-bold">Total Orders</span>}
            bordered={false}
            className="shadow-lg bg-gradient-to-r from-green-400 to-green-600 text-white"
          >
            <Statistic value={34} suffix="Orders" className="font-bold" />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={<span className="font-bold">Total Purchase Amount</span>}
            bordered={false}
            className="shadow-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white"
          >
            <Statistic value={1230} prefix="$" className="font-bold" />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={<span className="font-bold">Total Amount Spent</span>}
            bordered={false}
            className="shadow-lg bg-gradient-to-r from-purple-400 to-purple-600 text-white"
          >
            <Statistic value={2045} prefix="$" className="font-bold" />
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={16}>
        {/* Orders Line Chart */}
        <Col span={12}>
          <Card
            title={<span className="font-bold">Order History</span>}
            bordered={false}
            className="shadow-lg"
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="orders" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Purchases Bar Chart */}
        <Col span={12}>
          <Card
            title={<span className="font-bold">Purchase Trends</span>}
            bordered={false}
            className="shadow-lg"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={purchaseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="purchase" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDashboard;
