import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BASE_URL } from "../../utils/constatnts";
import {
  getItemWithExpire,
  setItemWithExpire,
  deleteCredentialsCache,
} from "../../utils/localStorage";
// import { setUser as setUserAction } from "../../auth/auth.slice";
// import { useDispatch } from "react-redux";
const PROFILE_URL = `${BASE_URL}/user/profile`;
const REFRESH_TOKEN_URL = `${BASE_URL}/auth/refresh`;

function getTokens() {
  const refreshToken = getItemWithExpire("refreshToken");
  const accessToken = getItemWithExpire("accessToken");
  return { accessToken, refreshToken };
}
function getUserFromServer() {
  const { accessToken, refreshToken } = getTokens();
  return fetch(PROFILE_URL, {
    headers: { Authorization: `Bearer ${getItemWithExpire("accessToken")}` },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      if (res.status === 401) {
        throw { error: "unauthorize", code: 401 };
      } else {
        throw new Error("failed to get user from ");
      }
    }
  });
}
function refreshTokenRequest() {
  const { accessToken, refreshToken } = getTokens();
  return fetch(REFRESH_TOKEN_URL, {
    headers: { Authorization: `Bearer ${refreshToken}` },
  }).then((res) => {
    if (!res.ok) {
      if (res.status === 401) {
        throw { error: "unAuthorize", code: 401 };
      } else {
        throw new Error("failed request to refresh token endpoint");
      }
    }
    return res.json();
  });
}
export default function useUser() {
  const [user, setUser] = useState(getItemWithExpire("user"));
  const qc = useQueryClient();
  //user query
  const { data, status, isFetching, isError, error, refetch } = useQuery(
    ["user"],
    getUserFromServer,
    {
      onSuccess: (data) => {
        updateUser(data);
      },
      networkMode: "always",
      enabled: !!user,
    }
  );
  //refreshToken query
  const { error: refreshTokenError } = useQuery(
    ["refreshToken"],
    refreshTokenRequest,
    {
      onSuccess: (data) => {
        console.log("refresh Success", data);
        setItemWithExpire("accessToken", data.token, { exact: data.expiresIn });
        refetch();
      },
      networkMode: "always",
      enabled: error?.code === 401,
    }
  );

  //if refresh token was expired then delete user cache
  if (refreshTokenError?.code === 401) {
    deleteUser();
  }

  function updateUser(user) {
    console.log("updateUser", user);
    setUser(user);
    qc.setQueryData(["user"], user);
    setItemWithExpire("user", user, Date.now() + 1 * 24 * 60 * 60 * 1000);
  }
  function deleteUser() {
    setUser(null);
    deleteCredentialsCache();
    qc.updateUser(["user"], null);
  }
  return { user, updateUser, deleteUser };
}
