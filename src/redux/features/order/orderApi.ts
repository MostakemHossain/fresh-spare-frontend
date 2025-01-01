import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    cashOnDelivery: builder.mutation({
      query: (data) => ({
        url: "/order/cash-on-delivery",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),
    payments: builder.mutation({
      query: (data) => ({
        url: "/order/checkout",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: "/order/get-my-order",
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    getallOrders: builder.query({
      query: () => ({
        url: "/order/get-all-order",
        method: "GET",
      }),
      providesTags: ["order"],
    }),
  }),
});

export const {
  useCashOnDeliveryMutation,
  usePaymentsMutation,
  useGetMyOrdersQuery,
  useGetallOrdersQuery,
} = orderApi;
