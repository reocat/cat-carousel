import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const nekoapi = createApi({
  reducerPath: "nekoapi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://nekos.life/api/v2/img/neko" }),
  endpoints: (builder) => ({
    getNekoApi: builder.query({
      query: (numImages) => `?limit=${numImages}`,
    }),
  }),
});

export const { useGetNekoApiQuery } = nekoapi;
