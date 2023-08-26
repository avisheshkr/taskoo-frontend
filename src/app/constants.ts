const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://taskoo.onrender.com/";
const USER_URL = "/user";
const TASK_URL = "/task";

export { BASE_URL, USER_URL, TASK_URL };
