/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaymentApiResponse } from "@/src/types/payment.types";
import { baseApi } from "./baseApi";

export type RevenuePeriod = "monthly" | "yearly";

export interface DashboardOverviewStats {
  totalUsers: number;
  totalDeathNotices: number;
  totalFuneralNotices: number;
  totalMemorials: number;
  pendingReports: number;
  totalRevenue: number;
}

export interface DashboardRevenueChartPoint {
  label: string;
  amount: number;
}

export interface DashboardNotice {
  id: string;
  name: string;
  status: "PUBLISHED" | "DRAFT" | "PENDING";
  createdAt: string;
  createdBy?: {
    fullName?: string;
    email?: string;
    image?: string;
  };
}

export interface DashboardActivity {
  id: string;
  action: string;
  details?: string;
  createdAt: string;
  user?: {
    fullName?: string;
    email?: string;
    image?: string;
  };
}

export interface DashboardOverviewData {
  stats: DashboardOverviewStats;
  revenueChart: {
    period: RevenuePeriod;
    chart: DashboardRevenueChartPoint[];
    totalRevenue: number;
  };
  subscribedUsers: number;
  nonSubscribedUsers: number;
  recentDeathNotices: DashboardNotice[];
  recentFuneralNotices: DashboardNotice[];
  recentActivity: DashboardActivity[];
}

export interface DashboardOverviewResponse {
  success: boolean;
  message: string;
  data: DashboardOverviewData;
}

export type AdminUserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export interface AdminUserListItem {
  name: any;
  type: any;
  images: any;
  location: any;
  dateOfPassing: any;
  funeralLocation: any;
  createdBy: any;
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: AdminUserStatus;
  role: string;
  image?: string;
  createdAt: string;
  obituaryCount: number;
}

export interface AdminUsersMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface AdminUsersResponse {
  success: boolean;
  message: string;
  data: AdminUserListItem[];
  meta: AdminUsersMeta;
}

export interface AdminUserNotice {
  id: string;
  name: string;
  status: string;
  createdAt: string;
}

export interface AdminUserPayment {
  id: string;
  transactionId: string;
  amount: number;
  method: string;
  status: string;
  createdAt: string;
}

export interface AdminUserDetails {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: AdminUserStatus;
  role: string;
  image?: string;
  gender?: string;
  createdAt: string;
  obituaryCount: number;
  deathNotices: AdminUserNotice[];
  funeralNotices: AdminUserNotice[];
  memorials: AdminUserNotice[];
  payments: AdminUserPayment[];
}

export interface AdminUserDetailsResponse {
  success: boolean;
  message: string;
  data: AdminUserDetails;
}

export interface GetAllUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: AdminUserStatus;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query<
      DashboardOverviewResponse,
      { revenuePeriod?: RevenuePeriod } | void
    >({
      query: (params) => {
        const revenuePeriod = params?.revenuePeriod ?? "monthly";

        return {
          url: `/admin/dashboard/overview?revenuePeriod=${revenuePeriod}`,
          method: "GET",
        };
      },
    }),

    getAllUsers: builder.query<AdminUsersResponse, GetAllUsersParams | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();

        if (params?.page) searchParams.append("page", String(params.page));
        if (params?.limit) searchParams.append("limit", String(params.limit));
        if (params?.search) searchParams.append("search", params.search);
        if (params?.status) searchParams.append("status", params.status);
        if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
        if (params?.sortOrder)
          searchParams.append("sortOrder", params.sortOrder);

        const query = searchParams.toString();

        return {
          url: query
            ? `/admin/dashboard/users?${query}`
            : "/admin/dashboard/users",
          method: "GET",
        };
      },
      providesTags: [{ type: "User", id: "ADMIN_LIST" }],
    }),

    getUserDetails: builder.query<AdminUserDetailsResponse, string>({
      query: (id) => ({
        url: `/admin/dashboard/users/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),

    updateUserStatus: builder.mutation<
      { success: boolean; message: string },
      { id: string; status: AdminUserStatus }
    >({
      query: ({ id, status }) => ({
        url: `/admin/dashboard/users/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "User", id: "ADMIN_LIST" },
        { type: "User", id },
      ],
    }),

    deleteUser: builder.mutation<{ success: boolean; message: string }, string>(
      {
        query: (id) => ({
          url: `/admin/dashboard/users/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [{ type: "User", id: "ADMIN_LIST" }],
      },
    ),

    // Obituary
    getAllObituary: builder.query<AdminUsersResponse, GetAllUsersParams | void>(
      {
        query: (params) => {
          const searchParams = new URLSearchParams();

          if (params?.page) searchParams.append("page", String(params.page));
          if (params?.limit) searchParams.append("limit", String(params.limit));
          if (params?.search) searchParams.append("search", params.search);
          if (params?.status) searchParams.append("status", params.status);
          if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
          if (params?.sortOrder)
            searchParams.append("sortOrder", params.sortOrder);

          const query = searchParams.toString();

          return {
            url: query
              ? `/admin/dashboard/obituaries?${query}`
              : "/admin/dashboard/obituaries",
            method: "GET",
          };
        },
        providesTags: [{ type: "User", id: "ADMIN_LIST" }],
      },
    ),
    getObituaryDetails: builder.query<AdminUserDetailsResponse, string>({
      query: (id) => ({
        url: `/admin/dashboard/obituaries/funeral/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
    getDeathDetails: builder.query<AdminUserDetailsResponse, string>({
      query: (id) => ({
        url: `/admin/dashboard/obituaries/death/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
    deleteDeathNotice: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/admin/dashboard/obituaries/death/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "ADMIN_LIST" }],
    }),
    deleteFuneralNotice: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/admin/dashboard/obituaries/funeral/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "ADMIN_LIST" }],
    }),
    getPaymentData: builder.query<PaymentApiResponse, any | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();

        if (params?.page) searchParams.set("page", String(params.page));
        if (params?.limit) searchParams.set("limit", String(params.limit));
        if (params?.status) searchParams.set("status", params.status);
        if (params?.startDate) searchParams.set("startDate", params.startDate);
        if (params?.endDate) searchParams.set("endDate", params.endDate);
        if (params?.search) searchParams.set("search", params.search);

        const qs = searchParams.toString();

        return {
          url: `/admin/dashboard/payments${qs ? `?${qs}` : ""}`,
          method: "GET",
        };
      },
      // providesTags: ["Payment"],
    }),

    getAllModerationReports: builder.query({
      query: () => ({
        url: `/admin/dashboard/moderation/reports`,
        method: "GET",
      }),
      providesTags: [{ type: "User", id: "ADMIN_LIST" }],
    }),

    removeReportedContent: builder.mutation({
      query: (id) => ({
        url: `/admin/dashboard/moderation/reports/${id}/remove`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "User", id: "ADMIN_LIST" }],
    }),

    dismissReport: builder.mutation({
      query: (id) => ({
        url: `/admin/dashboard/moderation/reports/${id}/dismiss`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "User", id: "ADMIN_LIST" }],
    }),
  }),
});

export const {
  useGetDashboardOverviewQuery,
  useGetAllUsersQuery,
  useGetUserDetailsQuery,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
  useGetAllObituaryQuery,
  useGetObituaryDetailsQuery,
  useGetDeathDetailsQuery,
  useDeleteDeathNoticeMutation,
  useDeleteFuneralNoticeMutation,
  useGetPaymentDataQuery,
  useDismissReportMutation,
  useRemoveReportedContentMutation,
  useGetAllModerationReportsQuery,
} = dashboardApi;
