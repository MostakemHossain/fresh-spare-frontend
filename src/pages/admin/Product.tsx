/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoSearchOutline } from "react-icons/io5";
import { useGetAllProductQuery } from "../../redux/features/product/productApi";
import ProductCard from "./ProductCard";

interface ProductQueryParams {
  searchTerm?: string;
  page?: number;
}

const Product = () => {
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);

  const { register, watch, setValue } = useForm<ProductQueryParams>({
    defaultValues: { searchTerm: "" },
  });

  const searchTerm = watch("searchTerm");
  const { data } = useGetAllProductQuery({ searchTerm, page });

  useEffect(() => {
    if (data?.data?.total?.totalPage) {
      setTotalPageCount(data?.data?.total?.totalPage);
    }
  }, [data]);

  const handleNext = () => {
    if (page < totalPageCount) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleSearchReset = () => {
    setValue("searchTerm", "");
    setPage(1);
  };

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between gap-4">
        <h2 className="font-semibold text-3xl">
          Product{" "}
          <span className="text-red-600">
            ({data?.data?.total?.total || 0})
          </span>
        </h2>
        <div className="h-full min-w-24 max-w-56 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded border focus-within:border-primary-200">
          <IoSearchOutline size={25} />
          <input
            type="text"
            placeholder="Search product here ..."
            className="h-full w-full outline-none bg-transparent"
            {...register("searchTerm")}
          />
          {searchTerm && (
            <button onClick={handleSearchReset} className="text-red-500">
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="p-4 bg-blue-50">
        <div className="min-h-[55vh]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {data?.data?.data.map((p: { id: any; name?: string; unit?: string; image?: string[]; }) => (
                                    //@ts-ignore
              <ProductCard key={p.id} data={p} />
            ))}
          </div>
        </div>

        <div className="flex justify-between my-4">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className="border border-primary-200 px-4 py-1 hover:bg-primary-200"
          >
            Previous
          </button>
          <button className="w-full bg-slate-100">
            {page}/{totalPageCount}
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPageCount}
            className="border border-primary-200 px-4 py-1 hover:bg-primary-200"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Product;
