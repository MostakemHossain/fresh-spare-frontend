/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, Pagination, Space, Table, Tag } from "antd";
import { useState } from "react";
import { useGetMyOrdersQuery } from "../../redux/features/order/orderApi";

const MyOrder = () => {
  const { data } = useGetMyOrdersQuery("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const paginatedData = data?.data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalOrders = data?.data?.length || 0;

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Product Name",
      dataIndex: ["product_details", "name"],
      key: "productName",
    },
    {
      title: "Images",
      dataIndex: ["product_details", "image"],
      key: "images",
      render: (images: string[]) => (
        <Space>
          {images.slice(0, 1).map((image, index) => (
            <Image key={index} width={50} src={image} />
          ))}
        </Space>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
      key: "paymentStatus",
      render: (payment_status: string) => (
        <Tag color={payment_status === "ONLINE PAYMENT" ? "green" : "blue"}>
          {payment_status}
        </Tag>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) => `$${amount}`,
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "orderDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  const dataSource = paginatedData?.map((order: any) => ({
    key: order._id,
    orderId: order.orderId,
    product_details: order.product_details,
    payment_status: order.payment_status,
    totalAmount: order.totalAmount,
    createdAt: order.createdAt,
  }));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">
        My Orders (<span className="text-red-500">{totalOrders}</span>)
      </h1>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 800 }}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalOrders}
        onChange={handlePageChange}
        showTotal={(total) => `Total ${total} orders`}
        style={{ marginTop: 20, textAlign: "center" }}
      />
    </div>
  );
};

export default MyOrder;
