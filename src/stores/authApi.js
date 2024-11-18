import axios from "axios";

export const loginApi = async (credentials) => {
  const response = await axios.post("add the login link here", credentials);
  return response.data;
};

export const signupApi = async (userData) => {
  const response = await axios.post("add the signup link here", userData);
  return response.data;
};
