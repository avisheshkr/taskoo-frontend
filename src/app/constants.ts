const BASE_URL =
  process.env.NODE_ENV === "development"
    ? import.meta.env.VITE_LOCALAPIURL
    : import.meta.env.VITE_DOMAINAPIURL;
const USER_URL = "/user";
const TASK_URL = "/task";

export { BASE_URL, USER_URL, TASK_URL };
