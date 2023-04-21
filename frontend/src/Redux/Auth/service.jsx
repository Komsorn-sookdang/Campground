import api from "../../API";

const googleLoginReq = async (tokenId) => {
  console.log("googleLogin");
  const res = await api.post("/auth/google", { tokenId }, { timeout: 30000 });
  console.log("googleLogin res :>> ", res);
  return res;
};

const authService = {
  googleLoginReq,
};

export default authService;
