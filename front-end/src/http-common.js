import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.0.75:1500",
  headers: {
    "Content-type": "application/json",
  },
});
