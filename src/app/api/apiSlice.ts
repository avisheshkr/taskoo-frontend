import {
  // BaseQueryFn,
  // FetchArgs,
  // FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
// import { Mutex } from "async-mutex";
// import { sendLogout, setCredentials } from "../../features/auth/authSlice";

// const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
});

// const customFetchBase: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   // wait until the mutex is available without locking it
//   await mutex.waitForUnlock();
//   let result = await baseQuery(args, api, extraOptions);
//   if ((result.error?.data as any)?.message === "You are not logged in") {
//     if (!mutex.isLocked()) {
//       const release = await mutex.acquire();

//       try {
//         const refreshResult = await baseQuery(
//           { url: "/user/refresh" },
//           api,
//           extraOptions
//         );

//         if (refreshResult.data) {
//           // Retry the initial query
//           result = await baseQuery(args, api, extraOptions);
//         } else {
//           api.dispatch(clearAccessToken());
//           window.location.href = "/login";
//         }
//       } finally {
//         // release must be called once the mutex should be released again.
//         release();
//       }
//     } else {
//       // wait until the mutex is available without locking it
//       await mutex.waitForUnlock();
//       result = await baseQuery(args, api, extraOptions);
//     }
//   }

//   return result;
// };

// const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 403) {
//     console.log("sending refresh token");
//     // send refresh token to get new access token
//     const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
//     console.log({ refreshResult });
//     if (refreshResult?.data) {
//       // const user = api.getState().auth.user;
//       console.log(refreshResult.data);
//       //store new token
//       api.dispatch(setAccessToken({ ...refreshResult.data }));
//       // retry the original query with new access token
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(clearAccessToken());
//     }
//   }
//   return result;
// };

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Task"],
  endpoints: (builder) => ({}),
});
