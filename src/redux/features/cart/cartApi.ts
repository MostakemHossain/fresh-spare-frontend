import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/cart/add-to-cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cart"],
    }),
    getCartItem: builder.query({
      query: () => ({
        url: "/cart/get-cart-item",
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
    updateCartItem: builder.mutation({
      query: (data) => ({
        url: "/cart/update-cart-item",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["cart"],
    }),
    deleteCartItem: builder.mutation({
      query: (data) => ({
        url: "/cart/delete-cart-item",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartItemQuery,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = cartApi;
