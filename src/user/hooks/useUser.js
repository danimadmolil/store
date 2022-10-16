import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getItemWithExpire,
  setItem,
  setItemWithExpire,
  deleteCredentialsCache,
} from "../../utils/localStorage";

const PROFILE_URL = "http://localhost:4001/user/profile";
const REFRESH_TOKEN_URL = "http://localhost:4001/auth/refresh";

function getTokens() {
  const refreshToken = getItemWithExpire("refreshToken");
  const accessToken = getItemWithExpire("accessToken");
  return [accessToken, refreshToken];
}

export default function useUser() {
  const [user, setUser] = useState(null);
  const navigator = useNavigate();
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (redirectToLogin === true) {
      navigator({ pathname: "/signin" });
    }
  }, [redirectToLogin, navigator]);
  useEffect(() => {
    if (!user) {
      //check if user is in localStorage
      const _user = getItemWithExpire("user");
      if (!!_user) {
        //if user is in localStorage set that as current user state
        setUser(_user);
      }
    }
  }, [user]);
  const {
    status,
    isFetching,
    isError,
    refetch: refetchProfile,
  } = useQuery(["user"], getUserFromServer(user), {
    networkMode: "always",
    enabled: !redirectToLogin,
  });

  useQuery(["refreshToken"], refreshToken, {
    enabled: isError,
    networkMode: "always",
    onError: (err) => {
      // console.log("err", err);
      // navigator({ pathname: "/signin" });
    },
  });

  function refreshToken() {
    const [, refreshToken] = getTokens();
    if (!refreshToken) {
      setRedirectToLogin(true);
      // throw new Error("user not authenticated (access token is not present)");
    }
    return fetch(REFRESH_TOKEN_URL, {
      headers: { Authorization: `Bearer ${refreshToken}` },
    })
      .then((res) => {
        if (res.ok) {
          setRedirectToLogin(false);
          return res.json();
        } else if (res.status === 401) {
          //if refresh token get expired
          deleteCredentialsCache();
          setRedirectToLogin(true);
          throw new Error("refresh token is expire");
        } else if (res.status === 403) {
          deleteCredentialsCache();
          setRedirectToLogin(true);
          throw new Error("refresh token is expire");
        }
      })
      .then((res) => {
        setRedirectToLogin(false);
        setItemWithExpire("accessToken", res.token, res.expiresIn);
        refetchProfile();
      });
  }
  function getUserFromServer(user) {
    return async () => {
      const [accessToken, refreshToken] = getTokens();
      return fetch(PROFILE_URL, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((res) => {
          if (!refreshToken) {
            // setRedirectToLogin(true);
            // throw new Error("user not authenticated (access token is not present)");
          } else if (!accessToken) {
            throw new Error("access token not present");
          }
          if (!res.ok) {
            throw new Error("failed to get user from ");
          } else if (res.status === 401) {
            throw new Error("access token is expired");
            //enable refreshToken query
          }

          return res.json();
        })
        .then((res) => {
          updateUser(res);
          return res;
        });
    };
  }

  //update user
  function updateUser(user) {
    // set user in local Storagef
    setItem("user", user);
    //set user in query cache
    setUser(user);
    queryClient.setQueryData(["user"], user);
  }
  return { user, updateUser, isError, status, isFetching };
}
