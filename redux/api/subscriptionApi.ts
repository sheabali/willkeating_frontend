/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "./baseApi";

export const subscriptionPlans = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: (credentials: any) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (credentials: any) => ({
        url: "/plans",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    getAllSubscription: builder.query({
      query: () => ({
        url: "/plans/get-all",
        method: "GET",
      }),
    }),
    getSingleSubscription: builder.query({
      query: (id: any) => ({
        url: `/plans/single/${id}`,
        method: "GET",
      }),
    }),
    createSubscriptionIntent: builder.mutation({
      query: (payload: any) => ({
        url: "/payment/create-subscription-intent",
        method: "POST",
        body: payload,
      }),
    }),
    getMyPaymentId: builder.query({
      query: () => ({
        url: "/payment/get-my-payment-id",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetAllSubscriptionQuery,
  useCreateSubscriptionIntentMutation,
  useGetSingleSubscriptionQuery,
  useGetMyPaymentIdQuery,
} = subscriptionPlans;
