import { apis } from '@/redux/api/apiSlice';
import { IProduct, IProductsData } from './interface';

export const productApi = apis.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProductsData, Record<string, any>>({
      query: (filters) => ({
        url: '/products',
        params: filters,
      }),
    }),
    singleProduct: builder.query<IProduct, string>({
      query: (id) => `/product/${id}`,
    }),
    addComment: builder.mutation<unknown, unknown>({
      query: ({ id, ...body }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['comment'],
    }),
    getComments: builder.query<{ comments: string[] }, string>({
      query: (id) => `/comment/${id}`,
      providesTags: ['comment'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useSingleProductQuery,
  useAddCommentMutation,
  useGetCommentsQuery,
} = productApi;
