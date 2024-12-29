import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (formData: FormData) => ({
        url: "/category/create-category",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["category"],
    }),
    getAllCategory: builder.query({
      query: () => ({
        url: "/category/all",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
  }),
});

export const { useCreateCategoryMutation, useGetAllCategoryQuery } =
  categoryApi;
