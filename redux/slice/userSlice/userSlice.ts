import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
