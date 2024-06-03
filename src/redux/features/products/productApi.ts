import { apis } from '@/redux/api/apiSlice';
import { IProduct, IProductsData } from './interface';

export const productApi = apis.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProductsData, unknown>({
      query: () => '/products',
    }),
    singleProduct: builder.query<IProduct, string>({
      query: (id) => `/product/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useSingleProductQuery } = productApi;
