import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import productDetailReducer from "./productDetailsSlice";
import cartCountReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    product: productDetailReducer,
    cart: cartCountReducer,
  },
});

export default store;
