import { configureStore } from '@reduxjs/toolkit';
import { apis } from './api/apiSlice';
import cartReducer from './features/cart/cartSlice';
import productReducer from './features/products/productSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    [apis.reducerPath]: apis.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apis.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
