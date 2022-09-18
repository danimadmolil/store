import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  ScrollRestoration,
} from "react-router-dom";

import Header2 from "./components/Header";
import Index from "./pages/Index.page";
import { Box, useTheme } from "@mui/material";
import { useRef } from "react";
import { useEffect } from "react";
import SmoothScrollbar from "smooth-scrollbar";
import useBreakpoint from "./hooks/useBreakpoint";
function App() {
  const theme = useTheme();
  const scrollContainer = useRef();
  const screenSize = useBreakpoint();
  useEffect(() => {
    SmoothScrollbar.init(scrollContainer.current, {
      continuousScrolling: true,
    });
  }, []);

  return (
    <div
      ref={scrollContainer}
      style={{
        margin: "0 auto",
        height: "100vh",
        width: "100vw",
        maxWidth: "1920px",
      }}>
      <Box
        className="App"
        sx={{
          maxWidth: "1920px",
          width: "100vw",
          margin: "0 auto",
          position: "relative",
        }}>
        <Box>
          <Router>
            <Routes>
              <Route index path="/" element={<Index />}></Route>
              <Route path="/signIn" element={<Index />}></Route>
              <Route path="/signOut" element={<Index />}></Route>
            </Routes>
          </Router>
        </Box>
      </Box>
    </div>
  );
}

export default App;
