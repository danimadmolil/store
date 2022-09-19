import React, { useRef, useState } from "react";
import TopLevelMenu from "./TopLevelMenu";
import {
  Box,
  Collapse,
  List,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useBreakpoint from "../hooks/useBreakpoint";
import { ArrowDropDownRounded, ArrowDropUpRounded } from "@mui/icons-material";

export default function SuperMenu({ title = "", menus, subProperty }) {
  const theme = useTheme();
  console.log("super menu", subProperty);
  const mouseOverDropDown = useRef(false);
  const screenSize = useBreakpoint();
  const smallerThanMedium = useMediaQuery(
    theme.breakpoints.between("xs", "md")
  );

  const [dropDown, setDropDown] = useState(false);
  function handleDropDownMouseLeave() {
    if (screenSize === "md" || screenSize === "lg" || screenSize === "xl") {
      mouseOverDropDown.current = false;
      setDropDown(false);
    }
  }
  function handleDropDownMouseOver() {
    if (screenSize === "md" || screenSize === "lg" || screenSize === "xl") {
      mouseOverDropDown.current = true;
    }
  }
  const [collapse, setCollapse] = useState(false);
  function toggleCollapse() {
    setCollapse(!collapse);
  }
  return (
    <Box
      sx={{ width: "100%" }}
      onMouseLeave={handleDropDownMouseLeave}
      onMouseOver={() => setDropDown(true)}
      onClick={() => toggleCollapse()}>
      <MenuItem
        disableRipple
        sx={{
          overflow: "visible",
          cursor: "pointer",
          position: "relative",
          margin: 0,
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-between",
          alignItems: "center",
          [theme.breakpoints.down("md")]: {
            width: "100%",
            display: "flex",
            flexFlow: "row",
            textAlign: "center",
          },
        }}
        text={title}>
        <ListItemIcon>
          {collapse ? <ArrowDropUpRounded /> : <ArrowDropDownRounded />}
        </ListItemIcon>
        <ListItemText>{title}</ListItemText>
      </MenuItem>
      {smallerThanMedium ? (
        <Collapse
          unmountOnExit
          orientation="vertical"
          onClick={(e) => e.stopPropagation()}
          in={collapse}
          sx={{
            width: "98vw",
            top: "100px",
            left: "50%",
            position: "fixed",
            overflow: "hidden",
            direction: "rtl",
            display: "block",
            transform: "translateX(-50%)",
            borderRadius: "0 0px 8px 8px",
            background: "white",
            right: 0,
            boxSizing: "border-box",
            zIndex: 10000,
            [theme.breakpoints.down("md")]: {
              position: "static",
              display: "block !important",
              width: "100%",

              borderRadius: "0",
              transform: "none",
            },
          }}>
          <Paper
            sx={{ overflow: "hidden" }}
            elevation={0}
            onClick={(e) => e.stopPropagation()}
            onMouseOver={handleDropDownMouseOver}
            onMouseLeave={handleDropDownMouseLeave}>
            <Box
              sx={{
                height: "100%",
                width: ["100%", "100%", "200px", "200px", "200px"],
                display: "flex",
                flexDirection: "column",
                borderLeft: "1px solid gray",
              }}>
              <List
                sx={{
                  position: "static",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexFlow: "column",
                }}>
                {menus &&
                  menus.map((menu) => (
                    <TopLevelMenu
                      key={menu.id}
                      menu={menu}
                      subProperty={subProperty}
                    />
                  ))}
              </List>
            </Box>
          </Paper>
        </Collapse>
      ) : (
        <Paper
          onClick={(e) => e.stopPropagation()}
          onMouseOver={handleDropDownMouseOver}
          onMouseLeave={handleDropDownMouseLeave}
          sx={{
            width: "98vw",
            height: "500px",
            top: "120px",
            left: "50%",
            position: "fixed",
            overflow: "hidden",
            direction: "rtl",
            display: dropDown === false ? "none" : "block",
            transform: "translateX(-50%)",
            borderRadius: "0 0px 8px 8px",
            background: "white",
            right: 0,
            boxSizing: "border-box",
            zIndex: 10000,
            [theme.breakpoints.down("md")]: {
              position: "static",
              display: "block !important",
              width: "100%",
              height: "auto",
              borderRadius: "0",
              transform: "none",
            },
          }}>
          <Box
            sx={{
              height: "100%",
              width: ["100%", "100%", "200px", "200px", "200px"],
              display: "flex",
              flexDirection: "column",
              borderLeft: "1px solid gray",
            }}>
            <List
              sx={{
                position: "static",
                width: "100%",
                height: "100%",
                display: "flex",
                flexFlow: "column",
              }}>
              {menus &&
                menus.map((menu) => (
                  <TopLevelMenu
                    key={menu.id}
                    menu={menu}
                    subProperty={subProperty}
                  />
                ))}
            </List>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
