import { createSlice } from "@reduxjs/toolkit";

let localData = JSON.parse(localStorage.getItem("cart") || "[]");

const createReducder = createSlice({
  name: "cart",
  initialState: localData,
  reducers: {
    addItem(state, action) {
      state.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeItem(state, action) {
      let item_Id = action.payload;
      let dltItem = state.filter((product) => product._id !== item_Id);

      localStorage.setItem("cart", JSON.stringify(dltItem));
      return dltItem;
    },
  },
});

export default createReducder.reducer;
export const { addItem, removeItem } = createReducder.actions;
