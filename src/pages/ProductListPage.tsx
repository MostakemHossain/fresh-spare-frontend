import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import CardProduct from "../components/CardProduct";
import Header from "../components/Header";
import { useGetProductByCategoryAndSubCategoryMutation } from "../redux/features/product/productApi";
import { useGetAllSubCategoryQuery } from "../redux/features/subCategory/subCategoryApi";

import {
  Product,
  ProductQueryParams,
  ProductResponse,
  SubCategory,
} from "../types/product-types";
import { validURLConvert } from "../utils/validURLConvert";

const ProductListPage = () => {
  const [getProductByCategoryAndSubCategory] =
    useGetProductByCategoryAndSubCategoryMutation();
  const [page] = useState(1);
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [, setTotalPage] = useState(1);
  const params = useParams<{ category?: string; "sub-category"?: string }>();
  const { data: subCategories } = useGetAllSubCategoryQuery("");
  const [displaySubCategory, setDisplaySubCategory] = useState<SubCategory[]>(
    []
  );

  const subCategory = params["sub-category"]
    ? params["sub-category"].split("-")
    : [];
  const subCategoryName = subCategory
    ?.slice(0, subCategory?.length - 1)
    ?.join(" ");
  const categoryId = params?.category
    ? params.category.split("-").slice(-1)[0]
    : null;
  const subCategoryId = params["sub-category"]
    ? params["sub-category"].split("-").slice(-1)[0]
    : null;

  const fetchProductData = async () => {
    const queryParams: ProductQueryParams = {
      category: categoryId,
      subCategory: subCategoryId,
      page: page,
      limit: 20,
    };
    try {
      setLoading(true);
      const response = await getProductByCategoryAndSubCategory(queryParams);

      if ("data" in response) {
        const responseData = response.data as ProductResponse;
        if (responseData.success) {
          if (responseData.data.page === 1) {
            setData(responseData.data.data);
          } else {
            setData((prevData) => [...prevData, ...responseData.data.data]);
          }
          setTotalPage(responseData.totalCount);
        }
      } else {
        // Handle error case
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [params]);

  useEffect(() => {
    if (!categoryId || !subCategories) {
      console.error(
        "Category ID is missing or subCategories data is unavailable."
      );
      return;
    }

    const sub = subCategories?.data?.filter((s: SubCategory) => {
      return s.category.some((el) => el._id === categoryId);
    });

    setDisplaySubCategory(sub || []);
  }, [params, subCategories, categoryId]);

  return (
    <div>
      <Header />
      <section className="sticky top-24 lg:top-20">
        <div className="container sticky top-24 mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">
          {/** Subcategory Section **/}
          <div className="min-h-[88vh] max-h-[88vh] overflow-y-scroll grid gap-1 shadow-md scrollbarCustom bg-white py-2">
            {displaySubCategory.map((s, index) => {
              const link = `/${validURLConvert(s?.category[0]?.name)}-${
                s?.category[0]?._id
              }/${validURLConvert(s.name)}-${s._id}`;
              return (
                <Link
                  to={link}
                  key={`subcategory-${index}`}
                  className={`w-full p-2 mt-5 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b 
                  hover:bg-green-100 cursor-pointer ${
                    subCategoryId === s._id ? "bg-green-100" : ""
                  }`}
                >
                  <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded box-border">
                    <img
                      src={s.image}
                      alt="subCategory"
                      className="w-14 lg:h-14 lg:w-12 h-full object-scale-down"
                    />
                  </div>
                  <p className="-mt-6 font-medium lg:mt-0 text-xs text-center lg:text-left lg:text-base">
                    {s.name}
                  </p>
                </Link>
              );
            })}
          </div>

          {/** Product Section **/}
          <div>
            <div className="bg-white shadow-md p-4 z-10">
              <h3 className="font-semibold">{subCategoryName}</h3>
            </div>
            <div>
              <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto relative">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
                  {data.map((p, index) => (
                    <CardProduct
                      data={p}
                      key={p._id + "productSubCategory" + index}
                    />
                  ))}
                </div>
              </div>
              {loading && <div>Loading...</div>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductListPage;
