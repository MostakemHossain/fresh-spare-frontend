/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Image, Space, Spin, Table, Tooltip } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useCreateSubCategoryMutation,
  useGetAllSubCategoryQuery,
} from "../../redux/features/subCategory/subCategoryApi";
import UploadSubCategoryModel from "./UploadSubCategoryModel";

interface SubCategoryType {
  _id: string;
  name: string;
  image: string;
  category: { _id: string; name: string; image: string }[];
  createdAt: string;
  updatedAt: string;
}

const SubCategory = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [createSubCategory] = useCreateSubCategoryMutation();
  const { data, isLoading } = useGetAllSubCategoryQuery("");

  const uploadSubCategory = async (values: {
    name: string;
    image: File;
    categories: string[];
  }) => {
    const formData = new FormData();
    formData.append("data", values.name);
    formData.append("file", values.image);
    formData.append("categories", JSON.stringify(values.categories));
    try {
      const res = await createSubCategory(formData).unwrap();
      if (res.success) {
        toast.success("Sub Category added successfully");
        setOpenAddSubCategory(false);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEdit = (id: string) => {
    toast.success(`Edit SubCategory with ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    toast.error(`Delete SubCategory with ID: ${id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <Image src={image} alt="SubCategory" width={50} />
      ),
    },
    {
      title: "Category Name(s)",
      dataIndex: "category",
      key: "category",
      render: (category: { name: string }[]) =>
        category.map((cat) => cat.name).join(", "),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: SubCategoryType) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record._id)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record._id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const dataSource = data?.data.map((item: SubCategoryType, index: number) => ({
    ...item,
    key: index,
  }));

  return (
    <section>
      <div className="lg:p-2 p-1 bg-white shadow-md flex px-2 items-center justify-between">
        <h2 className="font-semibold text-2xl">
          Sub Category (
          <span className="text-red-500">{data?.data?.length || 0}</span>)
        </h2>
        <button
          onClick={() => setOpenAddSubCategory(true)}
          className="text-sm border border-primary hover:bg-primary px-4 py-2 rounded-md"
        >
          Add Sub Category
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
        className="mt-4 border"
        scroll={{ x: "max-content" }}
      />
      {openAddSubCategory && (
        <UploadSubCategoryModel
          open={openAddSubCategory}
          close={() => setOpenAddSubCategory(false)}
          onSubmit={uploadSubCategory}
        />
      )}
    </section>
  );
};

export default SubCategory;
