import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const shibeApi = createApi({
  reducerPath: "shibeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shibe.online/api/cats?count=10",
  }),
  endpoints: (builder) => ({
    getShibeApi: builder.query({
      query: () => ``,
    }),
  }),
});
export const { useGetShibeApiQuery } = shibeApi;
