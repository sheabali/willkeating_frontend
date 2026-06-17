/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "./baseApi";

export const obituariesApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllObituaries: builder.query({
      query: (params: any) => {
        const searchParams = new URLSearchParams();

        if (params?.page) searchParams.append("page", String(params.page));
        if (params?.limit) searchParams.append("limit", String(params.limit));
        if (params?.search) searchParams.append("search", params.search);
        if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
        if (params?.sortOrder)
          searchParams.append("sortOrder", params.sortOrder);

        return {
          url: `/death-notices?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),
    getSingleObituaries: builder.query({
      query: (id: any) => ({
        url: `/death-notices/single/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetAllObituariesQuery, useGetSingleObituariesQuery } =
  obituariesApi;
