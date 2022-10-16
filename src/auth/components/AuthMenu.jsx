import React, {  useState } from "react";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Badge, Button, Grid, ListItemText, Paper } from "@mui/material";
import {
  useTheme,
  Tooltip,
  IconButton,
  Divider,
  ListItemIcon,
  MenuItem,
  Menu,
  Avatar,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { deleteCredentialsCache } from "../../utils/localStorage";
import { useQueryClient } from "@tanstack/react-query";
import {
  Delete,
  ShoppingCart,
  Visibility,
} from "@mui/icons-material";

export default function AuthMenu() {
  const [shoppingCartRef, setShoppingCartRef] = useState(null);
  const qc = useQueryClient();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleLogout() {
    deleteCredentialsCache();
    qc.setQueryData(["profile"], null);
  }
  function openShoppingCartMenu(e) {
    setShoppingCartRef(e.target);
  }
  function closeShoppingCartMenu() {
    setShoppingCartRef(null);
  }
  return (
    <Grid
      className="bag_auth"
      item
      container
      direction={"row"}
      justifyContent={"space-between"}
      sx={{
        flexWrap: "nowrap",
        marginRight: "auto",
        width: "auto",
        height: "44px",
        position: "relative",
        [theme.breakpoints.down("md")]: {
          order: 2,
          flexBasis: "100%",
        },
      }}>
      <Box>
        <Tooltip
          sx={{
            ".MuiPopover-root": {
              background: "red",
            },
          }}
          title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}>
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        sx={{
          ".MuiPopover-root": {
            background: "red",
          },
        }}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            position: "fixed",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem>
          <Link
            to="/profile"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              zIndex: 1000,
            }}></Link>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => handleLogout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Menu
        sx={{
          position: "fixed",
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        open={Boolean(shoppingCartRef)}
        anchorEl={shoppingCartRef}
        onClose={closeShoppingCartMenu}>
        <Paper sx={{ width: "300px", padding: "8px 4px" }}>
          <MenuItem sx={{ direction: "rtl" }}>
            <ListItemIcon>
              <Visibility sx={{ color: "text.primary" }} />
            </ListItemIcon>
            <Link
              to="/cart"
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 100,
              }}></Link>
            <ListItemText sx={{ textAlign: "start" }}>
              {"مشاهده سبد خرید"}
            </ListItemText>
          </MenuItem>
          <MenuItem sx={{ direction: "rtl" }}>
            <ListItemIcon>
              <Delete sx={{ color: "text.primary" }} />
            </ListItemIcon>
            <ListItemText sx={{ textAlign: "start" }}>
              {"حذف سبد خرید"}
            </ListItemText>
          </MenuItem>
          <Divider variant="middle" />
          <Button color="primary" fullWidth variant="contained">
            نهایی کردن خرید
          </Button>
        </Paper>
      </Menu>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={2}
        color={"primary"}>
        <Avatar variant="circular" sizes="small">
          <IconButton onClick={openShoppingCartMenu}>
            <ShoppingCart />
          </IconButton>
        </Avatar>
      </Badge>
    </Grid>
  );
}
