import { configureStore } from '@reduxjs/toolkit';
import { apis } from './api/apiSlice';
import cartReducer from './features/cart/cartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,

    [apis.reducerPath]: apis.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
