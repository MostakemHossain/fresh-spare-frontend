"use client";

import { Card, Col, Flex, Row, Spin, Statistic, Typography } from "antd";
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
import { useGetMyInfoQuery } from "../../redux/features/user/userApi";

// Sample data for charts
const orderData = [
  { name: "Jan", orders: 5 },
  { name: "Feb", orders: 8 },
  { name: "Mar", orders: 4 },
  { name: "Apr", orders: 7 },
  { name: "May", orders: 9 },
  { name: "Jun", orders: 6 },
];

const purchaseData = [
  { name: "Jan", purchase: 120 },
  { name: "Feb", purchase: 150 },
  { name: "Mar", purchase: 80 },
  { name: "Apr", purchase: 200 },
  { name: "May", purchase: 250 },
  { name: "Jun", purchase: 170 },
];

const { Title } = Typography;

const UserDashboard = () => {
  const { data, isLoading } = useGetMyInfoQuery("");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Flex align="center" gap="middle">
          <Spin size="large" />
        </Flex>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-100 w-full">
      <div className="relative bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-700 text-white p-6 sm:p-12 rounded-lg mb-6 shadow-lg">
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center">
          <img
            src={data?.data?.avatar}
            alt="User"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white mb-4 sm:mb-0 sm:mr-6"
          />
          <div className="text-center sm:text-left">
            <Title
              level={2}
              className="text-white font-bold text-xl sm:text-2xl"
            >
              {data?.data?.name}
            </Title>
            <p className="text-base sm:text-lg font-bold mt-2">
              We're glad to have you back! Here's your dashboard overview.
            </p>
          </div>
        </div>
      </div>

      {/* User Stats Section */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={24} md={8}>
          <Card
            title={<span className="font-bold">Total Orders</span>}
            bordered={false}
            className="shadow-lg bg-gradient-to-r from-green-400 to-green-600 text-white h-full"
          >
            <Statistic value={34} suffix="Orders" className="font-bold" />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card
            title={<span className="font-bold">Total Purchase Amount</span>}
            bordered={false}
            className="shadow-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white h-full"
          >
            <Statistic value={1230} prefix="$" className="font-bold" />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card
            title={<span className="font-bold">Total Amount Spent</span>}
            bordered={false}
            className="shadow-lg bg-gradient-to-r from-purple-400 to-purple-600 text-white h-full"
          >
            <Statistic value={2045} prefix="$" className="font-bold" />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
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
        <Col xs={24} lg={12}>
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
