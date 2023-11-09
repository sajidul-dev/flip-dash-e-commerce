import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FavouriteItem {
  _id: number;
  title: string;
  comment: string;
  image: string;
}

export interface CartState {
  items: FavouriteItem[];
}

const initialState: CartState = {
  items: [],
};

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    setFavourite: (state, action: PayloadAction<FavouriteItem>) => {
      state.items.push(action.payload);
    },
    setDefaultFavourite: (state, { payload }) => {
      state.items = payload;
    },
  },
});

export const { setFavourite, setDefaultFavourite } = favouriteSlice.actions;

export default favouriteSlice.reducer;
