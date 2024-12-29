/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Modal, Spin } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import noData from "../../assets/images/no data.png";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
} from "../../redux/features/category/categoryApi";
import UpdateModalCategory from "./UpdateModalCategory";
import UploadModalCategory from "./UploadModalCategory";

const { confirm } = Modal;

const Category = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [openUpdateCategory, setOpenUpdateCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const { data, isLoading } = useGetAllCategoryQuery("");
  const [isUpdating, setIsUpdating] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Flex align="center" gap="middle">
          <Spin size="large" />
        </Flex>
      </div>
    );
  }

  const handleUploadCategory = async (values: {
    name: string;
    image: File;
  }) => {
    const formData = new FormData();
    formData.append("data", values.name);
    formData.append("file", values.image);
    console.log(values.image);

    try {
      const response = await createCategory(formData).unwrap();
      if (response.success) {
        toast.success("Category Created successfully");
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      setOpenUploadCategory(false);
    }
  };

  const handleUpdateCategory = async (values: {
    name: string;
    image: File | null;
  }) => {
    setIsUpdating(true);
    const formData = new FormData();
    formData.append("data", values.name);
    if (values.image) {
      formData.append("file", values.image);
    }

    try {
      const response = await updateCategory({
        id: selectedCategory._id,
        formData: formData,
      }).unwrap();
      if (response.success) {
        toast.success("Category Updated successfully");
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      setOpenUpdateCategory(false);
      setSelectedCategory(null);
      setIsUpdating(false);
    }
  };

  const confirmDelete = (id: string) => {
    confirm({
      title: "Are you sure you want to delete this category?",
      okText: "Yes, Delete",
      centered: true,
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => handleDeleteCategory(id),
    });
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await deleteCategory(id).unwrap();
      if (response.success) {
        toast.success("Category deleted successfully");
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <section>
      <div className="lg:p-2 p-1 bg-white shadow-md flex px-2 items-center justify-between">
        <h2 className="font-semibold text-2xl">
          Category (<span className="text-red-500">{data?.data?.length}</span>)
        </h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-sm border border-primary hover:bg-primary px-4 py-2 rounded-md"
        >
          Add Category
        </button>
      </div>
      {openUploadCategory && (
        <UploadModalCategory
          open={openUploadCategory}
          close={() => setOpenUploadCategory(false)}
          onSubmit={handleUploadCategory}
        />
      )}
      {openUpdateCategory && selectedCategory && (
        <UpdateModalCategory
          open={openUpdateCategory}
          close={() => {
            setOpenUpdateCategory(false);
            setSelectedCategory(null);
          }}
          isLoading={isUpdating}
          onSubmit={handleUpdateCategory}
          initialValues={selectedCategory}
        />
      )}
      <div className="p-4">
        {data.data?.length === 0 ? (
          <div className="flex items-center justify-center">
            <img src={noData} alt="nodata" width={500} height={500} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
            {data?.data?.map((category: any) => (
              <div
                key={category?._id}
                className="p-2 flex flex-col items-center"
              >
                <img
                  src={category?.image}
                  alt={category?.name}
                  className="w-40 h-56 rounded-md"
                />
                <h3 className="mt-2 font-semibold text-lg">{category?.name}</h3>
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setOpenUpdateCategory(true);
                    }}
                    className="text-sm px-4 py-2 bg-primary rounded-md hover:bg-primary"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => confirmDelete(category?._id)}
                    className="text-sm px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <FaDeleteLeft />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Category;
