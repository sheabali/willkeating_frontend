/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "./baseApi";

export const priceApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllPrices: builder.query({
      query: () => ({
        url: "/plans/get-all",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetAllPricesQuery } = priceApi;
