import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.page";
import { Box, styled } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import getTheme from "./theme";
import SignIn from "./pages/SignIn.page";
import SignUp from "./pages/SignUp.page";
import ProfilePage from "./pages/Profile/Profile.page";
import Comments from "./pages/Profile/subPages/Comments";
import { connect } from "react-redux";
import Setting from "./pages/Profile/subPages/Setting";

const Body = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  maxWidth: "1920px",
  width: "100vw",
  minHeight: "100vh",
  margin: "0 auto",
  position: "relative",
}));

function App({ themeType }) {
  return (
    <ThemeProvider theme={getTheme(themeType)}>
      <Body className="App" sx={{}}>
        <Router>
          <Routes>
            <Route index path="/" element={<Index />}></Route>
            <Route path="/signIn" element={<SignIn />}></Route>
            <Route path="/signOut" element={<SignUp />}></Route>
            <Route path="/profile" element={<ProfilePage />}>
              <Route path="/profile/setting" element={<Setting />}></Route>
              <Route path="/profile/comments" element={<Comments />}></Route>
              <Route
                path="*"
                element={
                  <h1 style={{ textAlign: "center" }}>Not Found!</h1>
                }></Route>
            </Route>
            <Route
              path="*"
              element={
                <h1
                  style={{
                    display: "flex",
                    width: "100vw",
                    height: "100vh",
                    textAlign: "center",
                    justifyContent: "center",
                  }}>
                  Page Not Found!
                </h1>
              }></Route>
          </Routes>
        </Router>
      </Body>
    </ThemeProvider>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    themeType: state.theme.type,
  };
};
export default connect(mapStateToProps, null)(App);
