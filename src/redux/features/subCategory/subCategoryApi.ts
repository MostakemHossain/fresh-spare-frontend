import { baseApi } from "../../api/baseApi";

const subCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubCategory: builder.mutation({
      query: (formData: FormData) => ({
        url: "/sub-category/create-sub-category",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["subCategory"],
    }),
    getAllSubCategory: builder.query({
      query: () => ({
        url: "/sub-category/all",
        method: "GET",
      }),
      providesTags: ["subCategory"],
    }),
  }),
});

export const { useCreateSubCategoryMutation,useGetAllSubCategoryQuery } = subCategoryApi;
