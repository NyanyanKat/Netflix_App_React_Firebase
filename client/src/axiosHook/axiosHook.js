import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8800/api",
  withCredentials: true,
  headers: {
    token: "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
  },
});
