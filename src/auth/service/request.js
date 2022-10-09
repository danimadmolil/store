import { getItem } from "../../utils/localStorage";
export async function postRequest(path, payload) {
  return fetch(path, { method: "post", body: { ...payload } }).then((res) => {
    if (res.status === 401) {
      //unAuthenticated
      fetch("http://localhost:4001/auth/refresh", {
        headers: {
          Authorization: "Bearer " + getItem("auth")?.refreshToken,
        },
      });
    }
  });
}
