/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "./baseApi";

export const funeralApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    createFuneral: builder.mutation({
      query: (formData: FormData) => ({
        url: "/funeral-notices/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    getAllFuneral: builder.query({
      query: (params: any) => {
        const searchParams = new URLSearchParams();

        if (params?.page) searchParams.append("page", String(params.page));
        if (params?.limit) searchParams.append("limit", String(params.limit));
        if (params?.search) searchParams.append("search", params.search);
        if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
        if (params?.sortOrder)
          searchParams.append("sortOrder", params.sortOrder);

        return {
          url: `/funeral-notices?${searchParams.toString()}`,
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
  }),
});

export const {
  useCreateFuneralMutation,
  useGetAllFuneralQuery,
  useGetSingleFuneralQuery,
} = funeralApi;
