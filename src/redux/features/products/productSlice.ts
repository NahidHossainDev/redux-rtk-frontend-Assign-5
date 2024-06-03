import { RootState } from '@/redux/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProduct, IProductsData } from './interface';

interface IInitialProducts {
  products: IProduct[];
}
const initialState: IInitialProducts = {
  products: [],
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProducts: (state, action: PayloadAction<IProductsData>) => {
      state.products = action.payload.data;
    },
  },
});

export const { updateProducts } = productSlice.actions;
export const getProductState = (state: RootState) => state.products;

export default productSlice.reducer;
