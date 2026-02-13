import { config } from "../config/env";
import axios from "axios";

export const api = axios.create({
  baseURL: config.apiBaseUrl
    // baseURL: "http://localhost:4000/api"
});


console.log("API Base URL:", config.apiBaseUrl);
