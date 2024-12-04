import axios from "axios";
import { getMyToken } from "./utils";
const api = import.meta.env.VITE_API_BASE_URL;

export const requestAllProducts = async (url = null) => {
  const endpoint = url || `${api}/products`;
  const response = await axios.get(endpoint);
  return response.data;
};

export const requestSingleProduct = async (id) => {
  const response = await axios.get(`${api}/products/${id}`);
  return response.data.data;
};

export const searchProducts = async (params) => {
  const response = await axios.get(`${api}/products/search?keyword=${params}`);
  return response.data.result;
};

export const signUp = async (params) => {
  const response = await axios.post(`${api}/users`, params);
  return response;
};

export const signIn = async (params) => {
  const response = await axios.post(`${api}/users/sign_in`, params);
  return response;
};

export const postOrder = async (orderData) => {
  const token = getMyToken();
  const response = await axios.post(
    `${api}/orders`,
    {
      order_products: orderData,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
};

export const fetchAllOrders = async () => {
  const token = getMyToken();
  const response = await axios.get(`${api}/orders`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(`${api}/product_categories`);
  return response;
};

export const filterByCategories = async (id) => {
  const response = await axios.get(`${api}/product_categories/${id}`);
  return response;
};

export const postReview = async (id, comment, userId) => {
  const response = await axios.post(`${api}/products/${id}/comments`, {
    content: comment,
    user_id: userId,
  });
  return response.data;
};
