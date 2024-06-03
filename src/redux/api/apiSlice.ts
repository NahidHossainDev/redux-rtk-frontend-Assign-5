import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apis = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: () => ({}),
  tagTypes: ['comment'],
});
