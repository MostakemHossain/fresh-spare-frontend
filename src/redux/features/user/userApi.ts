import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyInfo: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    uploadAvatar: builder.mutation({
      query: (formData: FormData) => ({
        url: "/users/update-avatar",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetMyInfoQuery, useUploadAvatarMutation } = userApi;
