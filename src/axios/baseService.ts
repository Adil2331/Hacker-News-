import axios from "axios";

const baseService = axios.create({
  baseURL: `https://hacker-news.firebaseio.com/v0/`,
  headers: {
    accept: "application/json",
  },
});

export default baseService;
