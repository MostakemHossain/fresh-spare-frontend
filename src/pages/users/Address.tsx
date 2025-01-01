/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Modal, Row, Space, Table } from "antd";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import AddAddress from "../../components/AddAddress";

import toast from "react-hot-toast";
import {
  useDeleteAddressMutation,
  useGetAddressQuery,
} from "../../redux/features/address/addressApi";
import EditAddress from "./EditAddress";

const Address = () => {
  const { data } = useGetAddressQuery("");
  const [openAddress, setOpenAddress] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [deleteAddress] = useDeleteAddressMutation();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleEdit = (record: any) => {
    if (record) {
      setOpenEdit(true);
      setEditRecord(record);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteAddress(id).unwrap();
      if (result.success) {
        toast.success("Address deleted successfully");
      }
    } catch (error: any) {
      toast.error(error.data.message);
    } finally {
      setDeleteModalVisible(false);
      setDeleteId(null);
    }
  };

  const showDeleteModal = (id: string) => {
    setDeleteId(id);
    setDeleteModalVisible(true);
  };

  const columns = [
    {
      title: "Address Line",
      dataIndex: "address_line",
      key: "address_line",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Pincode",
      dataIndex: "pincode",
      key: "pincode",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            <FaEdit />
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => showDeleteModal(record?._id)}
          >
            <FaDeleteLeft />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <h2 className="">Address List</h2>
        </Col>
        <Col>
          <Button
            onClick={() => setOpenAddress(true)}
            className="bg-primary text-black hover:bg-primary"
          >
            Add Address
          </Button>
        </Col>
      </Row>
      <Table
        dataSource={data?.data || []}
        columns={columns}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 5 }}
      />
      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
      {openEdit && (
        <EditAddress
          record={editRecord}
          close={() => {
            setOpenEdit(false);
            setEditRecord(null);
          }}
        />
      )}
      <Modal
        title="Confirm Delete"
        visible={isDeleteModalVisible}
        centered
        onOk={() => deleteId && handleDelete(deleteId)}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this address?</p>
      </Modal>
    </div>
  );
};

export default Address;
