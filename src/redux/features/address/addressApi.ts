import { baseApi } from "../../api/baseApi";

const addressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAddress: builder.mutation({
      query: (data) => ({
        url: "/address/add-address",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["address"],
    }),
    updateAddress: builder.mutation({
      query: ({ id, data }) => ({
        url: `/address/update-address/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["address"],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/address/delete-address/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["address"],
    }),
    getAddress: builder.query({
      query: () => ({
        url: "/address/get-address",
        method: "GET",
      }),
      providesTags: ["address"],
    }),
  }),
});

export const {
  useCreateAddressMutation,
  useGetAddressQuery,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
