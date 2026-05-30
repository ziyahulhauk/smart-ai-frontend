import axios from "axios";

const API =
  "https://smart-ai-backend-f9fd.onrender.com/api/auth";

export const register =
  async (userData) => {
    const response =
      await axios.post(
        `${API}/register`,
        userData
      );

    return response.data;
  };

export const login =
  async (userData) => {
    const response =
      await axios.post(
        `${API}/login`,
        userData
      );

    return response.data;
  };