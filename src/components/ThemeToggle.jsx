import React from "react";
import { connect } from "react-redux";
import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import { Switch } from "@mui/material";
import { setThemeMode } from "../store/slices/themeSlice";
import { setItem } from "../utils/localStorage";

function ThemeToggle({ themeMode, setThemeModeAction }) {
  function toggleThemeMode() {
    setThemeModeAction({ type: themeMode === "dark" ? "light" : "dark" });
    setItem("theme", themeMode === "dark" ? "light" : "dark");
  }
  return (
    <Switch
      size="medium"
      onClick={toggleThemeMode}
      checked={themeMode === "dark" ? true : false}
      checkedIcon={<DarkModeRounded sx={{ color: "black" }} />}
      icon={<LightModeRounded sx={{ color: "black" }} />}></Switch>
  );
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setThemeModeAction: (payload) => {
      dispatch(setThemeMode(payload));
    },
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    themeMode: state.theme.type,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ThemeToggle);
