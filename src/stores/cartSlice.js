import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    resetCartCount: (state) => {
      state.cartCount = 0;
    },
  },
});

export const { setCartCount, resetCartCount } = cartSlice.actions;
export default cartSlice.reducer;
