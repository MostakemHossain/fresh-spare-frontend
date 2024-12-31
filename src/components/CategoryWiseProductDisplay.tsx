/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetProductByCategoryQuery } from "../redux/features/product/productApi";
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

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 200;
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4 flex items-center justify-between gap-4">
        <h1 className="font-semibold">{name}</h1>
        <Link className="text-green-600 hover:text-green-400" to="">
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
          {data?.data.map((p: Product, index: number) => (
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
