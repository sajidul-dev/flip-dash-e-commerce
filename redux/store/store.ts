import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../slice/counterSlice/counterSlice";
import cartSlice from "../slice/cartSlice/cartSlice";
import favouriteSlice from "../slice/favouriteSlice/favouriteSlice";
import userSlice from "../slice/userSlice/userSlice";

export const store = configureStore({
  reducer: {
    counterReducer: counterSlice,
    cartReducer: cartSlice,
    favouriteReducer: favouriteSlice,
    userReducer: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
