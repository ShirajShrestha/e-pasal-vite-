import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
};

const productDetailsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProductDetails: (state, action) => {
      state.product = action.payload;
    },
  },
});

export default productDetailsSlice.reducer;
export const { fetchProductDetails } = productDetailsSlice.actions;
export const setProductDetails = (state) => state.product.product;
