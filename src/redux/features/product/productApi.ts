/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/product/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    getAllProduct: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `/product/all`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["product"],
    }),
    getProductByCategory: builder.query({
      query: (id) => ({
        url: `/product/get-product-by-category/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    getProductByCategoryAndSubCategory: builder.mutation({
      query: (data) => ({
        url: `/product/get-product-by-category-and-sub-category`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useUploadImageMutation,
  useCreateProductMutation,
  useGetAllProductQuery,
  useGetProductByCategoryQuery,
  useGetProductByCategoryAndSubCategoryMutation,
} = productApi;
