import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const catapi = createApi({
  reducerPath: "catapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.thecatapi.com/v1/images/search?limit=10",
  }),
  endpoints: (builder) => ({
    getCatApi: builder.query({
      query: (name) => ``,
    }),
  }),
});
export const { useGetCatApiQuery } = catapi;
