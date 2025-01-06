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
    updateUserInformation: builder.mutation({
      query: (formData) => ({
        url: "/users/update-user",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),
    changePassword: builder.mutation({
      query: (formData) => ({
        url: "/users/change-password",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),
    googleUserLogin: builder.mutation({
      query: (formData) => ({
        url: "/users/google-login",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetMyInfoQuery,
  useUploadAvatarMutation,
  useUpdateUserInformationMutation,
  useChangePasswordMutation,
  useGoogleUserLoginMutation,
} = userApi;
