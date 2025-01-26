import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

export const api = createApi({
  baseQuery: baseQueryWithRetry,

  endpoints: () => ({}),
});
