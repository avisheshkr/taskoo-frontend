import { apiSlice } from "../../app/api/apiSlice";
import { TASK_URL } from "../../app/constants";

const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<any, any>({
      query: (args) => {
        return {
          url: `${TASK_URL}`,
          params: args,
        };
      },
      providesTags: ["Task"],
    }),
    postTask: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `${TASK_URL}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Task"],
    }),

    updateTask: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `${TASK_URL}/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Task"],
    }),

    deleteTask: builder.mutation<any, any>({
      query: (args) => {
        return {
          url: `${TASK_URL}/${args}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  usePostTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApiSlice;
