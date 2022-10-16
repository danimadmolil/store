import React, { useState } from "react";
import {
  ArrowDropDownRounded,
  ArrowDropUpRounded,
  ArrowLeft,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  Collapse,
  Divider,
  ListItem,
  ListItemText,
} from "@mui/material";
import "./Dropdown.css";
import useBreakpoint from "../hooks/useBreakpoint";

export default function Dropdown({ children, title = "title", subs }) {
  const [collapse, setCollapse] = useState(false);
  let currentBr = useBreakpoint();

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
          <Link
            to={`/${title}`}
            style={{
              textDecoration: "none",
              paddingRight: 8,
              color: "inherit",
            }}>
            {title}
          </Link>
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

 
}
