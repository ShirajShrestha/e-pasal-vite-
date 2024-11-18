import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { fetchProducts } = productSlice.actions;
export const setProducts = (state) => state.products.products;
