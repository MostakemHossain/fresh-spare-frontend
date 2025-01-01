"use client";

import { CalendarOutlined, MailOutlined } from "@ant-design/icons";
import { Avatar, Card, List, Progress, Select } from "antd";

// Sample data for last month
const deliveryData = [
  {
    id: 1,
    title: "Men's Running Shoes Activ...",
    author: "Aisha Bradley",
    status: "Delivered",
    date: "Dec 15, 2024",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    title: "Striped Baseball Cap",
    author: "Edgar Bailey",
    status: "Delivered",
    date: "Dec 20, 2024",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    title: "350 ml Glass Groce...",
    author: "Adam Small",
    status: "Out of Delivery",
    date: "Dec 28, 2024",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 4,
    title: "Monte Carlo Sweaters",
    author: "Evie Merrill",
    status: "Delivered",
    date: "Dec 31, 2024",
    image: "/placeholder.svg?height=50&width=50",
  },
];

const categoryData = [
  { name: "Fashion", value: 856, color: "#597ef7", lastMonth: true },
  { name: "Electronics", value: 742, color: "#f5222d", lastMonth: true },
  { name: "Groceries", value: 289, color: "#52c41a", lastMonth: true },
  { name: "Others", value: 654, color: "#722ed1", lastMonth: true },
];

const customersData = [
  {
    name: "Tommy Carey",
    date: "28 Dec, 2024",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Cassius Brock",
    date: "24 Dec, 2024",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Gabrielle Holden",
    date: "17 Dec, 2024",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Alfred Hurst",
    date: "15 Dec, 2024",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Kristina Hooper",
    date: "10 Dec, 2024",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Jacques Leon",
    date: "05 Dec, 2024",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const getStatusTag = (status: string) => {
  const statusStyles = {
    Shipping: "bg-yellow-100 text-yellow-800",
    Delivered: "bg-green-100 text-green-800",
    "Out of Delivery": "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs ${
        statusStyles[status as keyof typeof statusStyles]
      }`}
    >
      {status}
    </span>
  );
};

export default function TopCategoriesAndNewCustomers() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex items-center text-gray-500 mt-1">
          <CalendarOutlined className="mr-2" />
          <span>Last Month (December 2024)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product Delivery Section */}
        <Card
          title={
            <div className="flex justify-between items-center">
              <span className="font-semibold">Product Delivery</span>
              <a href="#" className="text-blue-500 text-sm">
                View All →
              </a>
            </div>
          }
          className="shadow-sm"
        >
          <List
            itemLayout="horizontal"
            dataSource={deliveryData}
            renderItem={(item) => (
              <List.Item>
                <div className="flex items-center w-full">
                  <Avatar shape="square" size={50} src={item.image} />
                  <div className="ml-4 flex-grow">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-gray-500 text-sm">
                      by: <span className="text-blue-500">{item.author}</span>
                      <br />
                      <span className="text-xs">{item.date}</span>
                    </div>
                  </div>
                  <div>{getStatusTag(item.status)}</div>
                </div>
              </List.Item>
            )}
          />
        </Card>

        {/* Top Categories Section */}
        <Card
          title={
            <div className="flex justify-between items-center">
              <span className="font-semibold">Top Categories</span>
              <Select defaultValue="Last Month" className="w-32">
                <Select.Option value="Last Month">Last Month</Select.Option>
              </Select>
            </div>
          }
          className="shadow-sm"
        >
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className="text-3xl font-bold">23</div>
                <div className="text-gray-500">December Sales</div>
              </div>
              {categoryData.map((category, index) => (
                <Progress
                  key={category.name}
                  type="circle"
                  percent={100}
                  strokeColor={category.color}
                  strokeWidth={4}
                  width={192 - index * 8}
                  showInfo={false}
                  className="absolute inset-0"
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {categoryData.map((category) => (
              <div key={category.name} className="text-center">
                <div className="text-2xl font-bold">{category.value}</div>
                <div className="text-gray-500">{category.name}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* New Customers Section */}
        <Card
          title={
            <div className="flex justify-between items-center">
              <span className="font-semibold">New Customers</span>
              <a href="#" className="text-blue-500 text-sm">
                View All →
              </a>
            </div>
          }
          className="shadow-sm"
        >
          <List
            itemLayout="horizontal"
            dataSource={customersData}
            renderItem={(item) => (
              <List.Item>
                <div className="flex items-center w-full">
                  <Avatar src={item.avatar} />
                  <div className="ml-4 flex-grow">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-gray-500 text-sm">{item.date}</div>
                  </div>
                  <MailOutlined className="text-red-500" />
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
}
