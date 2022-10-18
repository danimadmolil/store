import { getItemWithExpire } from "../../utils/localStorage";
export async function postRequest(path, payload) {
  return fetch(path, {
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
