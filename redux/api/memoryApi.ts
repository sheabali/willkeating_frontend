/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "./baseApi";

export const memoryApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    createMemory: builder.mutation({
      query: (formData: FormData) => ({
        url: "/memorials/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    getAllMemory: builder.query({
      query: (params: any) => {
        const searchParams = new URLSearchParams();

        if (params?.page) searchParams.append("page", String(params.page));
        if (params?.limit) searchParams.append("limit", String(params.limit));
        if (params?.search) searchParams.append("search", params.search);
        if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
        if (params?.sortOrder)
          searchParams.append("sortOrder", params.sortOrder);

        return {
          url: `/memorials?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),

    getSingleFuneral: builder.query({
      query: (id: any) => ({
        url: `/death-notices/single/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    commentsMemorial: builder.mutation({
      query: ({ id, data }: any) => ({
        url: `/comments/memorial/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateMemoryMutation,
  useGetSingleFuneralQuery,
  useGetAllMemoryQuery,
  useCommentsMemorialMutation,
} = memoryApi;
