/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Image,
  Modal,
  Space,
  Spin,
  Table,
  Tooltip,
  message,
} from "antd";
import { useState } from "react";
import {
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetAllSubCategoryQuery,
  useUpdateSubCategoryMutation,
} from "../../redux/features/subCategory/subCategoryApi";
import UpdateSubCategoryModal from "./UpdateSubCategoryModal";
import UploadSubCategoryModal from "./UploadSubCategoryModel";

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
  const [openUpdateSubCategory, setOpenUpdateSubCategory] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategoryType | null>(null);
  const [pageSize, setPageSize] = useState<number>(
    parseInt(localStorage.getItem("pageSize") || "5", 5)
  );

  const [createSubCategory] = useCreateSubCategoryMutation();
  const { data, isLoading } = useGetAllSubCategoryQuery("");
  const [deleteSubCategory] = useDeleteSubCategoryMutation();
  const [updateSubCategory] = useUpdateSubCategoryMutation();

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
        message.success("Sub Category added successfully");
        setOpenAddSubCategory(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const handleEdit = (subCategory: SubCategoryType) => {
    setSelectedSubCategory(subCategory);
    setOpenUpdateSubCategory(true);
  };

  const handleUpdate = async (values: {
    id: string;
    name: string;
    image?: File;
    categories: string[];
  }) => {
    const formData = new FormData();
    formData.append("data", values.name);
    if (values.image) {
      formData.append("file", values.image);
    }
    formData.append("categories", JSON.stringify(values.categories));
    try {
      const res = await updateSubCategory({
        id: selectedSubCategory?._id,
        formData: formData,
      }).unwrap();
      if (res.success) {
        message.success("Sub Category updated successfully");
        setOpenUpdateSubCategory(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this subcategory?",
      centered: true,
      okText: "Yes, Delete",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const res = await deleteSubCategory(id).unwrap();
          if (res.success) {
            message.success("SubCategory deleted successfully");
          }
        } catch (error: any) {
          message.error(error?.data?.message);
        }
      },
      onCancel: () => {
        console.log("Delete action canceled");
      },
    });
  };

  const handlePageSizeChange = (_current: number, size: number) => {
    setPageSize(size);
    localStorage.setItem("pageSize", size.toString());
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
              onClick={() => handleEdit(record)}
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

  const dataSource = data?.data.map((item: SubCategoryType) => ({
    ...item,
    key: item._id,
  }));

  return (
    <section>
      <div className="lg:p-2 p-1 bg-white shadow-md flex px-2 items-center justify-between">
        <h2 className="font-semibold text-2xl">
          Sub Category (
          <span className="text-red-500">{data?.data?.length || 0}</span>)
        </h2>
        <button
          className="text-sm border border-primary hover:bg-primary px-4 py-2 rounded-md"
          onClick={() => setOpenAddSubCategory(true)}
        >
          Add Sub Category
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          onShowSizeChange: handlePageSizeChange,
        }}
        className="mt-4"
        scroll={{ x: "max-content" }}
      />
      {openAddSubCategory && (
        <UploadSubCategoryModal
          open={openAddSubCategory}
          close={() => setOpenAddSubCategory(false)}
          onSubmit={uploadSubCategory}
        />
      )}
      {openUpdateSubCategory && selectedSubCategory && (
        <UpdateSubCategoryModal
          open={openUpdateSubCategory}
          close={() => setOpenUpdateSubCategory(false)}
          //@ts-ignore
          onSubmit={handleUpdate}
          subCategory={selectedSubCategory}
        />
      )}
    </section>
  );
};

export default SubCategory;
