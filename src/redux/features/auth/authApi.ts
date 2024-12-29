import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    registerAUser: builder.mutation({
      query: (userInfo) => ({
        url: "/users/registration",
        method: "POST",
        body: userInfo,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: userInfo,
      }),
    }),
    verificationOTP: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/verify-forgot-password-otp",
        method: "POST",
        body: userInfo,
      }),
    }),
    resetPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterAUserMutation,
  useForgotPasswordMutation,
  useVerificationOTPMutation,
  useResetPasswordMutation,
} = authApi;
