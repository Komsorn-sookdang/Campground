import axios from "axios";
const baseURL = "http://localhost:5000/api/v1";

export default axios.create({
  // withCredentials: true,
  baseURL,
});
