import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./reducer";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
  },
});
