/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getMyProfile: builder.query({
      query: (params?: {
        page?: number;
        limit?: number;
        search?: string;
        sortBy?: string;
        sortOrder?: string;
      }) => {
        const searchParams = new URLSearchParams();

        if (params?.page) searchParams.append("page", String(params.page));
        if (params?.limit) searchParams.append("limit", String(params.limit));
        if (params?.search) searchParams.append("search", params.search);
        if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
        if (params?.sortOrder)
          searchParams.append("sortOrder", params.sortOrder);

        const query = searchParams.toString();

        return {
          url: query ? `/users/my-posts?${query}` : "/users/my-posts",
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),

    deleteComment: builder.mutation({
      query: (id: string) => ({
        url: `/memorials/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    getProfile: builder.query({
      query: () => ({
        url: `/users/profile`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: (data: any) => ({
        url: `/users/update-profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useDeleteCommentMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = profileApi;
