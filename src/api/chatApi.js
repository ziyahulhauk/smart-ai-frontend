import axios from "axios";

const API =
  "https://smart-ai-backend-0i0y.onrender.com/api/chat";

const getConfig = () => {
  const userInfo =
    JSON.parse(
      localStorage.getItem(
        "userInfo"
      )
    );

  return {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
};

export const sendMessage =
  async (
    message,
    chatId
  ) => {
    const response =
      await axios.post(
        API,
        {
          message,
          chatId,
        },
        getConfig()
      );

    return response.data;
  };

export const getChats =
  async () => {
    const response =
      await axios.get(
        API,
        getConfig()
      );

    return response.data;
  };

export const getChat =
  async (id) => {
    const response =
      await axios.get(
        `${API}/${id}`,
        getConfig()
      );

    return response.data;
  };

export const deleteChat =
  async (id) => {
    const response =
      await axios.delete(
        `${API}/${id}`,
        getConfig()
      );

    return response.data;
  };