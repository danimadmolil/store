import React, { Children, useEffect, useRef, useState } from "react";
import {
  Backdrop,
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
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import GlobalSearch from "./GlobalSearch";
import Dropdown from "./Dropdown";
import { MenuOpen, QuestionAnswer } from "@mui/icons-material";
import TopLevelMenu from "./TopLevelMenu";
import useBreakpoint from "../hooks/useBreakpoint";
import SuperMenu from "./SuperMneu";
import { display } from "@mui/system";
import AuthButtonContainer from "../auth/components/AuthButtonContainer";

const Navbar = styled(Box, { shouldForwardProp: (prop) => true })(
  ({ theme, open = false }) => ({
    width: "100%",
    height: "80px",
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    boxSizing: "border-box",
    [theme.breakpoints.up("md")]: {
      height: "40px",
    },
  })
);
const NavMenu = styled("nav", { shouldForwardProp: () => true })(
  ({ theme, open }) => ({
    display: "flex",
    height: "100%",
    [theme.breakpoints.down("md")]: {
      alignItems: "center",
      background: "white",
      position: "fixed",
      left: "100%",
      top: "0px",
      height: "100vh",
      width: "400px",
      maxWidth: "100vw",
      transition: "0.35s ease-in-out",
      transform: open ? "translateX(-100%)" : "translateX(0%)",
      display: "flex",
      flexFlow: "column",
      zIndex: theme.zIndex.drawer + 10,
      overflowY: "scroll",
      direction: "rtl",
    },
  })
);
function CustomMenuItem({
  title,
  style,
  textStyle,
  ripple = false,
  ...restProps
}) {
  const theme = useTheme();
  return (
    <MenuItem
      disableRipple
      sx={{
        [theme.breakpoints.down("md")]: {
          alignSelf: "stretch",
          textAlign: "center",
        },
        ...style,
      }}>
      <Typography
        sx={{
          [theme.breakpoints.down("md")]: { flexBasis: "100%" },
          ...textStyle,
        }}>
        {" "}
        {title}
      </Typography>
    </MenuItem>
  );
}
const HeaderTop = styled("div")(({ theme }) => ({
  width: "100%",
  height: "auto",
  boxSizing: "border-box",
  padding: "18px 0px",
}));

export default function Header() {
  const [categories, setCategories] = useState();
  const { t } = useTranslation();
  const screenSize = useBreakpoint();
  const theme = useTheme();
  const [collapse, setCollapse] = useState(false);
  function handleCollapse() {
    setCollapse(!collapse);
  }
  useEffect(() => {
    fetch("http://localhost:4001/category")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw { error: "failed to fetch /category route" };
      })
      .then((res) => setCategories(res));
  }, []);
  const [menu, setMenu] = useState(false);

  function toggleMenu() {
    setMenu((_menu) => !_menu);
  }
  return (
    <Grid
      container
      sx={{
        position: "relative",
        top: 0,
        left: 0,
        boxSizing: "border-box",
        padding: "0 28px",
        justifyContent: "space-between",
        height: "128px",
        zIndex: "10000",
        background: "white",
        [theme.breakpoints.down("lg")]: {
          padding: "0 28px",
        },
        [theme.breakpoints.up("md")]: {
          flexDirection: "column",
        },
        [theme.breakpoints.between("xs", "md")]: {
          height: "170px",
        },
      }}>
      <Backdrop
        sx={{
          zIndex: 100,
          display:
            screenSize === "lg" || screenSize === "xl" || screenSize === "md"
              ? "none"
              : "absolute",
        }}
        open={menu}
        onClick={toggleMenu}></Backdrop>
      <HeaderTop>
        <Grid
          alignItems={"center"}
          container
          direction={"row"}
          sx={{
            height: "auto",
            width: "100%",
            [theme.breakpoints.up("md")]: {
              flexWrap: "nowrap",
            },
          }}>
          {/**bag and auth button container */}
          <AuthButtonContainer />
          {/**search input container */}
          <GlobalSearch
            style={{
              [theme.breakpoints.down("md")]: {
                flexBasis: "100%",
                order: 3,
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              [theme.breakpoints.down("md")]: {
                width: "100%",
                padding: "8px 0",
                order: 1,
              },
            }}>
            <Box sx={{ [theme.breakpoints.up("md")]: { display: "none" } }}>
              <QuestionAnswer />{" "}
            </Box>
            <img
              className="brand"
              style={{
                paddingLeft: "23px",
                width: "115px",
                height: "30px",
                objectFit: "cover",
              }}
              src="https://logos-world.net/wp-content/uploads/2020/11/Shopify-Logo.png"
            />
            <Box sx={{ [theme.breakpoints.up("md")]: { display: "none" } }}>
              <IconButton
                onClick={() => {
                  toggleMenu();
                }}>
                <MenuOpen />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </HeaderTop>
      <Navbar sx={{ display: "flex", justifyContent: "end" }}>
        <MenuItem
          disableRipple
          style={{ marginRight: "auto", display: "none" }}>
          <Typography>{"لوکیشن"}</Typography>
        </MenuItem>

        <NavMenu open={menu} onWheel={(e) => e.stopPropagation()}>
          <CustomMenuItem title={"تخفیف های ویژه"}></CustomMenuItem>
          <CustomMenuItem title={"لباس مردانه"}></CustomMenuItem>
          <CustomMenuItem title={"لباس زنانه"}></CustomMenuItem>
          <SuperMenu
            title="دسته بندی کالاها"
            menus={categories}
            subProperty={"subCategory"}
          />
        </NavMenu>
      </Navbar>
    </Grid>
  );
}

function MenuItem2({ icon, text, style = {}, children, ...restProps }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        marginRight: "28px",
        display: "flex",
        alignItems: "center",
        color: "#62666d",
        [theme.breakpoints.down("md")]: {
          marginRight: "0px",
          padding: "8px 0",
        },
        ...style,
      }}
      {...restProps}>
      {text ? text : ""}
      {icon && icon}
      {children}
    </Box>
  );
}
