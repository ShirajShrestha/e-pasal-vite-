import Cookies from "js-cookie";

export const setCookieData = (token, user) => {
  Cookies.set("user_token", JSON.stringify(token), { expires: 1 });
  Cookies.set("user_data", JSON.stringify(user), { expires: 1 });
};

export const getMyToken = () => {
  try {
    const token = JSON.parse(Cookies.get("user_token"));
    if (!token) throw new Error("Token not found.");
    return token;
  } catch (error) {
    console.error("Error fetching token:", error);
    // return ""; // Fallback to empty string
  }
};

export const signOut = async () => {
  Cookies.remove("user_data");
  Cookies.remove("user_token");
};
