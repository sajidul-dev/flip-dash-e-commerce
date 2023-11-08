import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  _id: number;
  title: string;
  comment: string;
  image: string;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
