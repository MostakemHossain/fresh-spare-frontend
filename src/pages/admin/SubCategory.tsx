/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateSubCategoryMutation } from "../../redux/features/subCategory/subCategoryApi";
import UploadSubCategoryModel from "./UploadSubCategoryModel";

const SubCategory = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [createSubCategory] = useCreateSubCategoryMutation();

  const uploadSubCategory = async (values: {
    name: string;
    image: File;
    categories: string[];
  }) => {
    const formData = new FormData();
    console.log(values);
    formData.append("data", values.name);
    formData.append("file", values.image);
    formData.append("categories", JSON.stringify(values.categories));
    try {
      const res = await createSubCategory(formData);
      console.log(res);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <section>
      <div className="lg:p-2 p-1 bg-white shadow-md flex px-2 items-center justify-between">
        <h2 className="font-semibold text-2xl">
          Sub Category (<span className="text-red-500">{0}</span>)
        </h2>
        <button
          onClick={() => setOpenAddSubCategory(true)}
          className="text-sm border border-primary hover:bg-primary px-4 py-2 rounded-md"
        >
          Add Sub Category
        </button>
      </div>
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
