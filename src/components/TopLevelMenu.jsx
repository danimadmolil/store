import React, { Children, useEffect, useRef, useState } from "react";
import {
  Box,
  ButtonBase,
  ClickAwayListener,
  Collapse,
  Divider,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Select,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Dropdown from "./Dropdown";
import useBreakpoint from "../hooks/useBreakpoint";
import "./TopLevelMenu.css";
import { Link } from "react-router-dom";
import {
  ArrowDropDown,
  ArrowDropDownRounded,
  ArrowDropUpRounded,
} from "@mui/icons-material";
const CustomListItem = styled(ListItem)(({ theme }) => ({
  maxWidth: "100px",
  padding: 0,
  color: "#81858b",
  ":hover": {
    color: "tomato",
  },
}));
const TopLevelMenuItem = styled(ListItem, { shouldForwardProp: () => true })(
  ({ theme }) => ({
    height: "80px",
    padding: "8px 0",
    ":hover": {
      transition: "background-color 0.2s ease",
      backgroundColor: "#f2f2f2",
    },
  })
);

const TopLevelMenu = ({ title, menu }) => {
  const theme = useTheme();
  const mdAndBigger = useMediaQuery(theme.breakpoints.up("md"));
  const screensBelowMedium = useMediaQuery(
    theme.breakpoints.between("xs", "md")
  );
  useEffect(() => {
    if (!screensBelowMedium) {
      setShowDropDown(false);
    }
  }, [screensBelowMedium]);
  const currentScreenSize = useBreakpoint();
  const bigScreens = { md: null, lg: null, xl: null };
  const [showDropDown, setShowDropDown] = useState(false);
  function handleMouseOver() {
    if (mdAndBigger) {
      setShowDropDown(true);
    }
  }
  function handleMouseLeave() {
    if (mdAndBigger) {
      setShowDropDown(false);
    }
  }
  function handleDropDownToggle() {
    if (currentScreenSize !== "lg" && currentScreenSize !== "md") {
      setShowDropDown(!showDropDown);
    }
  }
  return (
    <Box
      className="top_level_menu"
      sx={{ position: "static" }}
      onClick={handleDropDownToggle}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}>
      <TopLevelMenuItem
        sx={{
          height: "50px",
          minWidth: "100%",
        }}>
        <ListItemText sx={{ textAlign: "right", paddingRight: "8px" }}>
          {menu.title}
        </ListItemText>
        {showDropDown ? <ArrowDropUpRounded /> : <ArrowDropDownRounded />}
      </TopLevelMenuItem>
      {/** top level menu dropdown */}
      <Collapse
        onClick={(e) => e.stopPropagation()}
        in={showDropDown}
        timeout={screensBelowMedium ? 500 : 0}
        sx={{
          left: 0,
          display: showDropDown ? "flex" : "none",
          overflow: "hidden",
          flexFlow: "column",
          top: 0,
          width: [
            "100%",
            "100%",
            "calc(98vw - 200px)",
            "calc(98vw - 200px)",
            "calc(98vw - 200px)",
          ],
          position: ["static", "static", "absolute", "absolute", "absolute"],
          boxSizing: "border-box",
          height: "100%",
          direction: "rtl",
          [theme.breakpoints.down("md")]: {
            minHeight: "400px",
            height: "auto",
            overflow: "hidden",
          },
        }}
        direction={"column"}>
        <Link
          style={{
            textDecoration: "none",
            paddingRight: 8,
          }}
          to="/to">
          دیدن همه موارد این دسته
        </Link>
        <Box
          className="to_wrapper_inner"
          timeout={screensBelowMedium ? 2000 : 0}
          onClick={(e) => e.stopPropagation()}
          sx={{
            padding: "5px 10px 29px 234px",
            overflow: "hidden",
            // backgroundColor: "blue",
            "& .MuiCollapse-wrapper": {},
          }}>
          {recursiveRenderMenus(menu)}
        </Box>
      </Collapse>
    </Box>
  );
};

function recursiveRenderMenus(_menu) {
  if (!Array.isArray(_menu)) {
    _menu = _menu.subMenu;
  }
  return _menu.map((subMenu) => {
    if (subMenu.subMenu && subMenu.subMenu.length > 0) {
      return (
        <Dropdown key={subMenu.id} title={subMenu.title}>
          {recursiveRenderMenus(subMenu.subMenu)}
        </Dropdown>
      );
    } else {
      return (
        <CustomListItem
          key={subMenu.id}
          sx={{
            width: "150px",
            "& .MuiListItem-root": {
              width: "150px",
            },
          }}>
          <ListItemText
            sx={{
              direction: "rtl",
              "& .MuiTypography-root": {
                direction: "rtl",
                display: "flex",
                paddingRight: "6px",
              },
            }}>
            <Link
              style={{
                textDecoration: "none",
                paddingRight: 8,
                color: "inherit",
              }}
              to={`/${subMenu.title}`}>
              {subMenu.title}
            </Link>
          </ListItemText>
        </CustomListItem>
      );
    }
  });
}
export default TopLevelMenu;
