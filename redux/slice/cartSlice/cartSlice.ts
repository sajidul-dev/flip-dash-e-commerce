import { CartItem } from "@/types/productType";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// export interface CartItem {
//   _id: string;
//   title: string;
//   comment: string;
//   image: string;
// }

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
    setDefaultCart: (state, { payload }) => {
      state.items = payload;
    },
  },
});

export const { setCart, setDefaultCart } = cartSlice.actions;

export default cartSlice.reducer;
