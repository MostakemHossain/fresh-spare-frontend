/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetProductByCategoryQuery } from "../redux/features/product/productApi";
import { useGetAllSubCategoryQuery } from "../redux/features/subCategory/subCategoryApi";
import { SubCategory } from "../types/product-types";
import { validURLConvert } from "../utils/validURLConvert";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";

interface CategoryWiseProductDisplayProps {
  id: string;
  name: string;
}

interface Product {
  _id: string;
  [key: string]: any;
}

const CategoryWiseProductDisplay: React.FC<CategoryWiseProductDisplayProps> = ({
  id,
  name,
}) => {
  const { data, isLoading } = useGetProductByCategoryQuery(id);
  const loadingCardNumber = new Array(6).fill(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 200;
    }
  };

  const { data: subCategories } = useGetAllSubCategoryQuery("");

  const handleRedirectProductListpage = () => {
    const subcategory = subCategories?.data?.find((sub: SubCategory) => {
      const filterData = sub.category.some((c) => c._id === id);
      return filterData || null;
    });

    if (subcategory) {
      const url = `/${validURLConvert(name)}-${id}/${validURLConvert(
        subcategory.name
      )}-${subcategory._id}`;
      return url;
    } else {
      console.error("Subcategory not found for the provided category ID");
    }
  };

  const redirectURL = handleRedirectProductListpage();

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 200;
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4 flex items-center justify-between gap-4">
        <h1 className="font-semibold">{name}</h1>
        <Link
          to={redirectURL || "#"}
          className="border border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-semibold px-2 lg:px-4 py-1 rounded"
        >
          See All
        </Link>
      </div>
      <div className="relative flex items-center">
        <div
          className="flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth"
          ref={containerRef}
        >
          {isLoading &&
            loadingCardNumber.map((_, index) => <CardLoading key={index} />)}
          {data?.data.map((p: Product) => (
            <CardProduct key={p._id} data={p} />
          ))}
        </div>
        <div className="w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between">
          <button
            onClick={handleScrollLeft}
            className="z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleScrollRight}
            className="z-10 relative bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
