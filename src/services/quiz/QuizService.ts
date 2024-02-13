import axios from "axios";

export const quizData = async () => {
  try {
    const response = await axios
      .get(
        "https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=boolean"
      )
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
