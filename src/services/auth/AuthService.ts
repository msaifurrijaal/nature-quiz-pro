import axios from "axios";

export const loginAuth = async (username: string, password: string) => {
  try {
    const response = await axios
      .post("https://fakestoreapi.com/auth/login", {
        username,
        password,
      })
      .then((res) => {
        return {
          success: true,
          data: res,
        };
      })
      .catch((err) => {
        return {
          success: false,
          data: err,
        };
      });
    return response;
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};
