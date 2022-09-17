import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function useBreakpoint() {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  const md = useMediaQuery(theme.breakpoints.only("md"));
  const lg = useMediaQuery(theme.breakpoints.only("lg"));
  const xl = useMediaQuery(theme.breakpoints.only("xl"));
  const breakPoints = {
    xl,
    lg,
    md,
    sm,
    xs,
  };
  //run on first render to initialize screenSize
  const initialSize = useRef(null);
  if (initialSize.current === null) {
    Object.keys(breakPoints).forEach((br) => {
      if (breakPoints[br] === true) {
        initialSize.current = br;
      }
    });
  }
  const [screenSize, setScreenSize] = useState(initialSize.current);
  //run on every change on screen size
  useEffect(() => {
    Object.keys(breakPoints).forEach((br) => {
      if (breakPoints[br] === true) {
        setScreenSize(br);
      }
    });
  }, [xl, lg, md, sm, xs]);
  return screenSize;
}
