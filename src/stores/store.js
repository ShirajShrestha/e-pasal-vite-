import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import productDetailReducer from "./productDetailsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    product: productDetailReducer,
  },
});

export default store;
