import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../utils/constatnts";
import { connect } from "react-redux";
import useAuthQuery from "../hooks/useAuthQuery";
// BASE_URL + "/user/profile"

function ProfilePage({ auth }) {
  const { data, isSuccess, isLoading } = useAuthQuery(
    "profile",
    BASE_URL + "/user/profile",
    null,
    {},
    false
  );
  return isLoading ? (
    <CircularProgress color="primary" />
  ) : isSuccess ? (
    data ? (
      <h1>{data.email}</h1>
    ) : (
      <h1>no response</h1>
    )
  ) : (
    <h1>error</h1>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, null)(ProfilePage);
