import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import productDetailReducer from "./productDetailsSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    product: productDetailReducer,
  },
});

export default store;
