import api from "../../API";

export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });

  return res;
};

export const signOut = async () => {
  const res = await api.post("/auth/logout");

  return res;
};

export const googleLogin = async (tokenId) => {
  const res = await api.post("/auth/google", { tokenId });

  return res;
};
