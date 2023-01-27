import axios from "axios";
import { BASE_URL } from "./url";

export default (token) => {
  return axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      Authorization: token ? "Bearer " + token : "",
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });
};
