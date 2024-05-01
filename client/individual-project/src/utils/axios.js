import axios from "axios";

const cocUrl = axios.create({
  baseURL: "http://localhost:3000",
  //   baseURL: "https://api.clashofclans.com/v1",
  // baseURL: "https://api-clash-insight.hackimtech.com",
});

export default cocUrl;
