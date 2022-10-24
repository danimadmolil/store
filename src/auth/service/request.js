import { getItemWithExpire } from "../../utils/localStorage";
import { BASE_URL } from "../../utils/constatnts";
export async function postRequest(path, payload) {
  return fetch(BASE_URL + path, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getItemWithExpire("accessToken"),
    },
    body: JSON.stringify(payload),
  }).then((res) => {
    if (res.status === 401) {
      //unAuthenticated
      fetch("http://localhost:4001/auth/refresh", {
        headers: {
          Authorization: "Bearer " + getItemWithExpire("accessToken"),
        },
      });
    }
  });
}
export async function getRequest(path, options = { options: {}, headers: {} }) {
  return fetch(BASE_URL+path, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getItemWithExpire("accessToken")}`,
      ...options?.headers,
    },
    ...options.options,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("failed to get request to : " + path);
    }
  });
}
