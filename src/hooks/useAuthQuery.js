import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  deleteCredentialsCache,
  getItemWithExpire,
  setItemWithExpire,
} from "../utils/localStorage";

export default function useAuthQuery(
  key,
  path,
  payload,
  queryOptions,
  redirectToLogin = true
) {
  const navigator = useNavigate();
  const profileRequest = async () => {
    const options = {};
    if (payload) {
      options.body = { ...payload };
      options.method = "post";
    }
    options.headers = {
      Authorization: `Bearer ${getItemWithExpire("accessToken")}`,
    };
    return fetch(path, options)
      .then((res) => {
        if (res.status === 401) {
          throw new Error("failed to get profile");
          // return { authorization: true };
          //request a new access_token with refreshToken in the localStorage
        } else if (res.ok) {
          return res.json();
        } else {
          throw new Error("failed to query to " + path);
          // throw { error: `failed to query to ${path} address` };
        }
      })
      .then((res) => {
        return res;
      });
  };
  const _key = !Array.isArray(key)
    ? typeof key !== "string"
      ? wrongKeyTypeException()
      : [key]
    : key;
  const { refetch, data, isLoading, isFetching, isSuccess, isError, status } =
    useQuery(_key, profileRequest, {
      networkMode: "always",
      ...queryOptions,
    });
  console.log("useAuthQuery hook", { isLoading, data, isError, status });

  useQuery(
    ["http://localhost:4001/auth/refresh"],
    async () => {
      return fetch("http://localhost:4001/auth/refresh", {
        headers: {
          Authorization: `Bearer ${getItemWithExpire("refreshToken")}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          if (res.status === 401) {
            deleteCredentialsCache();
            if (redirectToLogin) {
              navigator({ pathname: "/signin" });
            }
            throw new Error("you need to login " + path);
          } else {
            throw new Error("failed to refresh access token ");

            // throw { error: "failed to refresh the access_token" };
          }
        })
        .then((res) => {
          // save access token in the Local Storage
          setItemWithExpire("accessToken", res.token, {
            exact: res.expiresIn,
          });
          return refetch();
        });
    },
    { enabled: isError }
  );
  return { data, refetch, isLoading, isSuccess, isFetching, isError, status };
}

function wrongKeyTypeException() {
  throw new Error("you should pass an array or string as query key");
}
