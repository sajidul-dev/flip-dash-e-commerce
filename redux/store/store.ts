import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../slice/counterSlice/counterSlice";
import cartSlice from "../slice/cartSlice/cartSlice";
import favouriteSlice from "../slice/favouriteSlice/favouriteSlice";
import userSlice from "../slice/userSlice/userSlice";
import productSlice from "../slice/productSlice/productSlice";
import categoriesSlice from "../slice/categorySlice/categorySlice";
import sellerSlice from "../slice/sellerSlice/sellerSlice";

export const store = configureStore({
  reducer: {
    counterReducer: counterSlice,
    cartReducer: cartSlice,
    favouriteReducer: favouriteSlice,
    userReducer: userSlice,
    productReducer: productSlice,
    categoriesReducer: categoriesSlice,
    sellerReducer: sellerSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
