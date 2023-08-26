const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.LOCAL_APIURL
    : process.env.DOMAIN_APIURL;
const USER_URL = "/user";
const TASK_URL = "/task";

export { BASE_URL, USER_URL, TASK_URL };
