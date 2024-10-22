import { apiSlice } from "../api/apiSlices";

export const schemeApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createScheme: builder.mutation({
      query: (data) => ({
        url: "schemes/create",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getSchemes: builder.query({
      query: () => ({
        url: "schemes/all",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateScheme: builder.mutation({
      query: ({ id, data }) => ({
        url: `schemes/update/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    deleteScheme: builder.mutation({
      query: (id) => ({
        url: `schemes/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),

    getSchemeDetails: builder.query({
      query: (slug) => ({
        url: `schemes/${slug}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getSchemeByEligibility: builder.query({
      query: (criteria) => ({
        url: "schemes/eligibility",
        method: "GET",
        body: criteria,
        credentials: "include",
      }),
    }),
    getPopularSchemes: builder.query({
      query: () => ({
        url: `schemes/top`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateSchemeMutation,
  useDeleteSchemeMutation,
  useGetSchemeByEligibilityQuery,
  useGetSchemeDetailsQuery,
  useGetSchemesQuery,
  useUpdateSchemeMutation,
  useGetPopularSchemesQuery,
} = schemeApi;
