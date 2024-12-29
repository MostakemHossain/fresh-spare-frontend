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
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/sub-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subCategory"],
    }),
    updateSubCategory: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/sub-category/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["subCategory"],
    }),
  }),
});

export const {
  useCreateSubCategoryMutation,
  useGetAllSubCategoryQuery,
  useDeleteSubCategoryMutation,
  useUpdateSubCategoryMutation,
} = subCategoryApi;
