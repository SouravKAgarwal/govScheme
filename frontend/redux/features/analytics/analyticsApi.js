import { apiSlice } from "../api/apiSlices";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersAnalytics: builder.query({
      query: () => ({
        url: "analytics/users",
        method: "GET",
        credentials: "include",
      }),
    }),
    getTotalSchemes: builder.query({
      query: () => ({
        url: "analytics/schemes",
        method: "GET",
        credentials: "include",
      }),
    }),
    getSchemeCount: builder.query({
      query: (data) => ({
        url: "analytics/schemes-count",
        method: "GET",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetUsersAnalyticsQuery,
  useGetTotalSchemesQuery,
  useGetSchemeCountQuery,
} = analyticsApi;
