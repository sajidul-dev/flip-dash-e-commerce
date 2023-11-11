import { Product } from "@/types/productType";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// export interface Product {
//   _id: number;
//   title: string;
//   category: string;
//   comment: string;
//   price: number;
//   image: string;
// }

export interface ProductState {
  products: Product[] | null;
}

const initialState: ProductState = {
  products: [],
};

export const productSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<any>) => {
      state.products = action.payload;
    },
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
