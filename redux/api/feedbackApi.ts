/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "./baseApi";

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllFeedback: builder.query({
      query: () => ({
        url: "/feedback/published",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetAllFeedbackQuery } = feedbackApi;
