import React, { useEffect } from "react";
import {
  Grid,
  Paper,
  Divider,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import AuthMenu from "./AuthMenu";
import useAuthQuery from "../../hooks/useAuthQuery";
import { connect } from "react-redux";
import { isError, useQueries } from "@tanstack/react-query";
import { BASE_URL } from "../../utils/constatnts";
import { getItemWithExpire, setItemWithExpire } from "../../utils/localStorage";
import { Person } from "@mui/icons-material";
import useUser from "../../user/hooks/useUser";
export default function AuthButtonContainer() {
  const theme = useTheme();
  const { isLoading, user, updateUser, isError } = useUser();

  return isLoading ? (
    <Grid
      className="bag_auth"
      item
      container
      direction={"row"}
      justifyContent={"space-between"}
      sx={{
        flexWrap: "nowrap",
        marginRight: "auto",
        width: "200px",
        height: "44px",
        position: "relative",
        [theme.breakpoints.down("md")]: {
          order: 2,
          flexBasis: "100%",
        },
      }}>
      <Box
        sx={{
          width: "50px",
          height: "50px",
          borderRadius: "25px",
          position: "relative",
        }}>
        <IconButton
          sx={{
            width: "25px",
            height: "25px",
            position: "relative",
            left: "50%",
            top: "50%",
            transform: "translate(-66%, -100%)",
          }}>
          <Person />
        </IconButton>
        <CircularProgress
          sx={{
            left: 0,
            top: 0,
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 100,
          }}
        />
      </Box>
    </Grid>
  ) : isError || user === null ? (
    <Grid
      className="bag_auth"
      item
      container
      direction={"row"}
      justifyContent={"space-between"}
      sx={{
        flexWrap: "nowrap",
        marginRight: "auto",
        width: "200px",
        height: "44px",
        position: "relative",
        [theme.breakpoints.down("md")]: {
          order: 2,
          flexBasis: "100%",
        },
      }}>
      <Link
        to="/signin"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}></Link>

      <IconButton
        sx={{
          width: "44px",
          height: "44px",
          color: "black",
          [theme.breakpoints.down("md")]: {
            order: 1,
          },
        }}>
        <BusinessCenterIcon fontSize="large" />
      </IconButton>
      <Divider
        sx={{ [theme.breakpoints.down("md")]: { display: "none" } }}
        orientation="vertical"
        flexItem
      />
      {/** register button */}

      <Paper
        elevation={0}
        sx={{
          borderRadius: "8px",
          border: "1px solid #e0e0e2",
          display: "flex",
          width: "135px",
          height: "40px",
          padding: "6px 16px",
          boxSizing: "border-box",
          cursor: "pointer",
          alignItems: "center",
          fontSize: "13px",
          [theme.breakpoints.down("md")]: {
            order: 2,
          },
        }}>
        {"ورود | ثبت نام"}
        <ExitToAppIcon />
      </Paper>
    </Grid>
  ) : (
    <AuthMenu />
  );
}
