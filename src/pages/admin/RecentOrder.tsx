/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { Avatar, Badge, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

interface OrderData {
  key: string;
  orderId: string;
  productName: string;
  category: string;
  customer: {
    name: string;
    avatar: string;
  };
  amount: number;
  orderDate: string;
  deliveryDate: string;
  quantity: string;
  ratings: number;
  status:
    | "Processing"
    | "Out For Delivery"
    | "Delivered"
    | "Pending"
    | "Confirmed";
}

export default function GroceryOrders() {
  const [sortBy, setSortBy] = useState("today");

  const data: OrderData[] = [
    {
      key: "1",
      orderId: "#GR010331",
      productName: "Fresh Orange Juice",
      category: "Beverages",
      customer: {
        name: "Terry White",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      amount: 58.0,
      orderDate: "17 Dec, 2022",
      deliveryDate: "18 Dec, 2022",
      quantity: "5 bottles",
      ratings: 4.5,
      status: "Processing",
    },
    {
      key: "2",
      orderId: "#GR010332",
      productName: "Whole Wheat Atta",
      category: "Flour & Grains",
      customer: {
        name: "Daniel Gonzalez",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      amount: 45.0,
      orderDate: "02 Jan, 2023",
      deliveryDate: "03 Jan, 2023",
      quantity: "10 kg",
      ratings: 4.8,
      status: "Out For Delivery",
    },
    {
      key: "3",
      orderId: "#GR010333",
      productName: "Olive Oil Extra Virgin",
      category: "Cooking Oils",
      customer: {
        name: "Stephen Bird",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      amount: 80.0,
      orderDate: "20 Dec, 2022",
      deliveryDate: "21 Dec, 2022",
      quantity: "2 liters",
      ratings: 4.3,
      status: "Delivered",
    },
    {
      key: "4",
      orderId: "#GR010334",
      productName: "All Purpose Cleaner",
      category: "Cleaning",
      customer: {
        name: "Ashley Silva",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      amount: 29.99,
      orderDate: "31 Nov, 2022",
      deliveryDate: "01 Dec, 2022",
      quantity: "3 bottles",
      ratings: 3.9,
      status: "Pending",
    },
    {
      key: "5",
      orderId: "#GR010335",
      productName: "Mixed Fruit Juice Pack",
      category: "Beverages",
      customer: {
        name: "Scott Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      amount: 64.37,
      orderDate: "23 Nov, 2022",
      deliveryDate: "24 Nov, 2022",
      quantity: "12 packs",
      ratings: 4.7,
      status: "Confirmed",
    },
    {
      key: "6",
      orderId: "#GR010336",
      productName: "Dish Washing Liquid",
      category: "Cleaning",
      customer: {
        name: "Heather Jimenez",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      amount: 41.98,
      orderDate: "02 Nov, 2022",
      deliveryDate: "03 Nov, 2022",
      quantity: "4 bottles",
      ratings: 4.4,
      status: "Delivered",
    },
  ];

  const columns: ColumnsType<OrderData> = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => (
        <a href="#" className="text-blue-500 hover:text-blue-700">
          {text}
        </a>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
          {category}
        </span>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customerName",
      render: (customer) => (
        <div className="flex items-center gap-2">
          <Avatar src={customer.avatar} />
          <span>{customer.name}</span>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <span>${amount.toFixed(2)}</span>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => <span className="text-gray-600">{quantity}</span>,
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Delivery Date",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusColors = {
          Processing: "blue",
          "Out For Delivery": "orange",
          Delivered: "green",
          Pending: "gold",
          Confirmed: "cyan",
        };
        return (
          <Badge
            //@ts-ignore
            color={statusColors[status]}
            text={status}
            className="whitespace-nowrap"
          />
        );
      },
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Recent orders</h2>
          
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500">SORT BY:</span>
          <Select
            defaultValue={sortBy}
            onChange={setSortBy}
            style={{ width: 120 }}
            options={[
              { value: "today", label: "Today" },
              { value: "weekly", label: "Weekly" },
              { value: "monthly", label: "Monthly" },
            ]}
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          total: 25,
          pageSize: 6,
          current: 2,
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total} Results`,
        }}
        scroll={{ x: true }}
        className="shadow-sm"
      />
    </div>
  );
}
