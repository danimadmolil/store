import React, { useState } from "react";
import {
  ClickAwayListener,
  InputBase,
  Paper,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
const AlignedTextInput = styled(InputBase)((theme) => ({
  "& .MuiInputBase-input": {
    textAlign: "end",
  },
}));
export default function GlobalSearch({ style }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <Paper
      onClick={() => {
        setOpen(true);
      }}
      elevation={0}
      sx={{
        alignItems: "center",
        borderRadius: "7px",
        display: "flex",
        justifySelf: "flex-start",
        position: "relative",
        width: "568px",
        height: "44px",
        justifyContent: "flex-end",
        bgcolor: "background.default",
        overflow: open ? "visible" : "hidden",
        ...style,
      }}>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Paper
          elevation={0}
          style={{
            borderRadius: "7px",
            transition: "all 1s",
            opacity: open === true ? 1 : 0,
            width: "100%",
            minHeight: "400px",
            position: "absolute",
            top: "0px",
            left: "0px",
            zIndex: 100,
            flexDirection: "column",
            display: "flex",
          }}>
          <Paper
            elevation={0}
            sx={{
              alignItems: "center",
              borderRadius: "7px",
              display: "flex",
              justifySelf: "flex-start",
              position: "relative",
              width: "100%",
              height: "44px",
              justifyContent: "flex-end",
              bgcolor: "background.default",
              [theme.breakpoints.down("md")]: {},
            }}>
            <AlignedTextInput
              sx={{
                textAlign: "end",
                paddingRight: "66px",
                height: "100%",
                width: "100%",
                position: "absolute",
                left: 0,
                top: 0,
              }}
              placeholder="جستجو"></AlignedTextInput>

            <svg
              onClick={() => alert("alert")}
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                cursor: "pointer",
                width: "24px",
                height: "24px",
                fill: "gray",
                padding: "4px 21px",
              }}
              width="24"
              height="24">
              <defs>
                <symbol
                  id="searchSearch"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M10.5 18a7.5 7.5 0 115.973-2.963l4.369 4.246-1.394 1.434-4.387-4.263A7.467 7.467 0 0110.5 18zm5.5-7.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"
                    clipRule="evenodd"></path>
                </symbol>
              </defs>
              <g fill="#A1A3A8">
                <path
                  fillRule="evenodd"
                  d="M10.5 18a7.5 7.5 0 115.973-2.963l4.369 4.246-1.394 1.434-4.387-4.263A7.467 7.467 0 0110.5 18zm5.5-7.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"
                  clipRule="evenodd"></path>
              </g>
            </svg>
          </Paper>
          <div
            style={{
              marginTop: 8,
              width: "90%",
              margin: "0 auto",
              height: "250px",
              borderRadius: 8,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              background:
                "url('https://dkstatics-public.digikala.com/digikala-adservice-banners/4f3d62e7327af22d481af89bd038aeaf54f2e98d_1662536602.jpg?x-oss-process=image/quality,q_95')",
            }}></div>
        </Paper>
      </ClickAwayListener>

      <Typography sx={{ marginLeft: "auto", color: "#81858b" }}>
        جستجو
      </Typography>
      <svg
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "24px",
          height: "24px",
          fill: "gray",
          padding: "4px 21px",
        }}
        width="24"
        height="24">
        <defs>
          <symbol
            id="searchSearch"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M10.5 18a7.5 7.5 0 115.973-2.963l4.369 4.246-1.394 1.434-4.387-4.263A7.467 7.467 0 0110.5 18zm5.5-7.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"
              clipRule="evenodd"></path>
          </symbol>
        </defs>
        <g fill="#A1A3A8">
          <path
            fillRule="evenodd"
            d="M10.5 18a7.5 7.5 0 115.973-2.963l4.369 4.246-1.394 1.434-4.387-4.263A7.467 7.467 0 0110.5 18zm5.5-7.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"
            clipRule="evenodd"></path>
        </g>
      </svg>
    </Paper>
  );
}
