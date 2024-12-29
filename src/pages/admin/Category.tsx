/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateCategoryMutation } from "../../redux/features/category/categoryApi";
import UploadModalCategory from "./UploadModalCategory";

const Category = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [createCategory] = useCreateCategoryMutation();

  const handleUploadCategory = async (values: {
    name: string;
    image: File;
  }) => {
    const formData = new FormData();
    formData.append("data", values.name);
    formData.append("file", values.image);

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

  return (
    <section>
      <div className="lg:p-2 p-1 bg-white shadow-md flex px-2 items-center justify-between">
        <h2 className="font-semibold text-2xl">Category</h2>
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
    </section>
  );
};

export default Category;
