/* eslint-disable @typescript-eslint/no-explicit-any */

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGetAllCategoryQuery } from "../redux/features/category/categoryApi";
import { useGetAllSubCategoryQuery } from "../redux/features/subCategory/subCategoryApi";
import { validURLConvert } from "../utils/validURLConvert";
import CategoryWiseProductDisplay from "./CategoryWiseProductDisplay";

interface Category {
  _id: string;
  name: string;
  image: string;
}

interface SubCategory {
  _id: string;
  name: string;
  category: { _id: string }[];
}

const ShopByCategory = () => {
  const { data, isLoading } = useGetAllCategoryQuery("");
  const navigate = useNavigate();

  const { data: subCategories } = useGetAllSubCategoryQuery("");

  const handleRedirectProductListpage = (id: string, cat: string) => {
    const subcategory = subCategories?.data?.find((sub: SubCategory) => {
      const filterData = sub.category.some((c) => c._id === id);
      return filterData || null;
    });

    if (subcategory) {
      const url = `/${validURLConvert(cat)}-${id}/${validURLConvert(
        subcategory.name
      )}-${subcategory._id}`;
      navigate(url);
    } else {
      toast.error("Subcategory not found for the provided category ID");
    }
  };

  return (
    <div>
      <div className="container mt-6 mb-10 cursor-pointer mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {isLoading
          ? new Array(20).fill(null).map((_, index) => (
              <div
                key={index + "loadingcategory"}
                className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
              >
                <div className="bg-blue-100 min-h-24 rounded"></div>
                <div className="bg-blue-100 h-8 rounded"></div>
              </div>
            ))
          : data?.data?.map((cat: Category) => (
              <div
                key={cat._id + "displayCategory"}
                className="w-full h-full"
                onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
              >
                <div>
                  <img
                    src={cat?.image}
                    alt={cat?.name}
                    className="w-full h-full object-scale-down"
                  />
                </div>
              </div>
            ))}
      </div>

      {/* display category product */}
      {data?.data?.map((c: any) => {
        return (
          <CategoryWiseProductDisplay key={c?._id} id={c?._id} name={c?.name} />
        );
      })}
    </div>
  );
};

export default ShopByCategory;
