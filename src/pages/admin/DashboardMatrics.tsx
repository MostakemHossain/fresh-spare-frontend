"use client";

import { Card } from "antd";
import {
  RiDashboardLine,
  RiShoppingBag3Line,
  RiUserLine,
  RiWalletLine,
} from "react-icons/ri";

export default function DashboardMetrics() {
  const metrics = [
    {
      title: "TOTAL EARNINGS",
      value: "$24,853",
      change: "+18.30%",
      isPositive: true,
      icon: <RiWalletLine className="w-6 h-6 text-violet-600" />,
      accentColor: "bg-violet-500",
      iconBg: "bg-violet-100",
    },
    {
      title: "ORDERS",
      value: "29",
      change: "-2.74%",
      isPositive: false,
      icon: <RiShoppingBag3Line className="w-6 h-6 text-blue-600" />,
      accentColor: "bg-blue-500",
      iconBg: "bg-blue-100",
    },
    {
      title: "CUSTOMERS",
      value: "24",
      change: "+29.08%",
      isPositive: true,
      icon: <RiUserLine className="w-6 h-6 text-yellow-600" />,
      accentColor: "bg-yellow-500",
      iconBg: "bg-yellow-100",
    },
    {
      title: "PRODUCTS",
      value: "300",
      change: "+1.67%",
      isPositive: true,
      icon: <RiDashboardLine className="w-6 h-6 text-blue-600" />,
      accentColor: "bg-blue-500",
      iconBg: "bg-blue-100",
    },
  ];

  return (
    <div className="p-4 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card
            key={index}
            className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300"
            bodyStyle={{ padding: "1.5rem" }}
          >
            <div
              className={`absolute left-0 top-0 w-1 h-full ${metric.accentColor}`}
            />
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <p className="text-gray-500 text-sm font-medium tracking-wider">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold">{metric.value}</p>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm px-2 py-0.5 rounded flex items-center gap-1 ${
                      metric.isPositive
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {metric.isPositive ? "↑" : "↓"} {metric.change}
                  </span>
                  <span className="text-gray-500 text-sm">than last week</span>
                </div>
              </div>
              <div className={`${metric.iconBg} p-3 rounded-lg`}>
                {metric.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
