import axios from "axios";
const api = import.meta.env.VITE_API_BASE_URL;

export const requestAllProducts = async () => {
  const response = await axios.get(`${api}/products`);
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
