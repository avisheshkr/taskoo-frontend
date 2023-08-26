import { apiSlice } from "../../app/api/apiSlice";
import { USER_URL } from "../../app/constants";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `${USER_URL}/register`,
          method: "POST",
          body: data,
        };
      },
    }),
    login: builder.mutation<any, any>({
      query: (credentials) => {
        return {
          url: `${USER_URL}/login`,
          method: "POST",
          body: credentials,
        };
      },
    }),
    logout: builder.mutation<any, void>({
      query: () => {
        return {
          url: `${USER_URL}/logout`,
          method: "POST",
        };
      },
    }),
    getUserProfile: builder.query<any, void>({
      query: () => {
        return {
          url: `${USER_URL}/profile`,
        };
      },
    }),
    getUsers: builder.query<any, any>({
      query: (args) => {
        return {
          url: `${USER_URL}`,
          params: args,
        };
      },
      providesTags: ["User"],
    }),
    updateUser: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `${USER_URL}/${data._id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),
    resetUserPasswordByAdmin: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `${USER_URL}/reset-password`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),
    sendEmailForPasswordreset: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `${USER_URL}/send-email`,
          method: "POST",
          body: data,
        };
      },
    }),
    verifyPasswordresetToken: builder.query<any, any>({
      query: (args) => {
        return {
          url: `${USER_URL}/reset-token`,
          params: args,
        };
      },
    }),
    resetPassword: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `${USER_URL}/forgot-password`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserProfileQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useResetUserPasswordByAdminMutation,
  useSendEmailForPasswordresetMutation,
  useVerifyPasswordresetTokenQuery,
  useResetPasswordMutation,
} = userApiSlice;
