import { CartItem } from "@/types/productType";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  items: CartItem[] | null;
}

const initialState: CartState = {
  items: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[] | null>) => {
      state.items = action.payload;
    },
    setDefaultCart: (state, { payload }) => {
      state.items = payload;
    },
  },
});

export const { setCart, setDefaultCart } = cartSlice.actions;

export default cartSlice.reducer;
