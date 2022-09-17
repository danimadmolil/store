import React, { useState } from "react";
import {
  ArrowDropDown,
  ArrowDropDownRounded,
  ArrowDropUp,
  ArrowDropUpRounded,
  ArrowLeft,
} from "@mui/icons-material";
import {
  Box,
  Collapse,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "./Dropdown.css";
import useBreakpoint from "../hooks/useBreakpoint";

export default function Dropdown({ children, title = "title", subs }) {
  const theme = useTheme();
  const [collapse, setCollapse] = useState(false);
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  const xl = useMediaQuery(theme.breakpoints.up("lg"));
  let currentBr = useBreakpoint();

  console.log("currentBr", currentBr);
  function handleCollapse(e) {
    e.preventDefault();
    e.stopPropagation();
    setCollapse((_collapse) => !_collapse);
  }
  return (
    <React.Fragment>
      <ListItem
        onClick={handleCollapse}
        sx={{
          padding: 0,
          minWidth: "160px",
          width: "150px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "& .MuiListItem-root": {
            width: "150px",
            background: "blue",
          },
        }}>
        <Divider
          sx={{
            color: "red",
            background: "red",
            width: "2px",
            height: "14px",
            marginRight: "9px",
          }}
        />
        <ListItemText
          sx={{
            fontSize: 22,
            fontWeight: "20px",
            paddingRight: "4px",
            ":hover": {
              color: "tomato",
            },
            "& .MuiTypography-root": {
              direction: "rtl",
              textAlign: "right",
            },
          }}>
          {title}
        </ListItemText>
        {currentBr === "lg" || currentBr === "xl" ? (
          <ArrowLeft sx={{ marginLeft: "auto" }} />
        ) : collapse ? (
          <ArrowDropDownRounded />
        ) : (
          <ArrowDropUpRounded />
        )}
      </ListItem>
      {/*<Typography noWrap> {title}</Typography> */}
      {currentBr === "sm" || currentBr === "md" || currentBr === "xs" ? (
        <Collapse
          classes={{ wrapperInner: "dr_wrapper_inner" }}
          sx={{}}
          in={collapse}>
          {children}
        </Collapse>
      ) : (
        children
      )}
    </React.Fragment>
  );

  {
    /**
    <MenuItem
      sx={{ display: "flex", flexDirection: "column" }}
      onClick={handleCollapse}>
      <Collapse in={collapse} appear={true}>
        {children}
      </Collapse>
    </MenuItem>
     */
  }
}
