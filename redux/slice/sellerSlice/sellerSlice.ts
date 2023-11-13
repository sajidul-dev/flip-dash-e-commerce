import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Seller {
  _id: string;
  name: string;
  email: string;
  shopName: string;
  shopLocation: string;
  shopCategory: string;
  phone: string;
}

export interface SellerState {
  seller: Seller | null;
}

const initialState: SellerState = {
  seller: null,
};

export const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    setSeller: (state, action: PayloadAction<Seller | null>) => {
      state.seller = action.payload;
    },
  },
});

export const { setSeller } = sellerSlice.actions;

export default sellerSlice.reducer;
