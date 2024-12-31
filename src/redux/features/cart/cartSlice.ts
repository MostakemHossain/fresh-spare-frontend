import { createSlice } from "@reduxjs/toolkit";
const inititalState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: inititalState,
  reducers: {
    addCartItem(state, action) {
      state.cart = action.payload;
    },
  },
});
export const { addCartItem } = cartSlice.actions;
export default cartSlice.reducer;
