import { apiSlice } from "../api/apiSlices";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLayout: builder.query({
      query: (type) => ({
        url: `layout/${type}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    editLayout: builder.mutation({
      query: ({
        type,
        image,
        title,
        subTitle,
        faq,
        categories,
        ministries,
        states,
      }) => ({
        url: `layout/edit`,
        method: "PUT",
        body: {
          type,
          image,
          title,
          subTitle,
          faq,
          categories,
          ministries,
          states,
        },
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetLayoutQuery, useEditLayoutMutation } = layoutApi;
