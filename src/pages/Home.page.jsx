import { Box, useTheme } from "@mui/material";
import * as ReactDOMServer from "react-dom/server";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import SwiperContainer from "../components/SwiperContiner";
import server from "../server.json";
import HotOffers from "../components/HotOffers";
export default function Home() {
  const theme = useTheme();
  return (
    <Box
      className="home_page"
      sx={{
        color: "white",
        width: "100%",

        left: "0",
        top: "128px",
        background: "black",
        position: "absolute",
        boxSizing: "border-box",
        [theme.breakpoints.down("md")]: {
          top: "170px;",
        },
      }}>
      <Box
        disableGutters
        maxWidth="1920px"
        sx={{
          width: "100%",
          height: ["200px", "250px", "350px", "450px", "600px"],
        }}>
        <SwiperContainer
          height={["100%"]}
          slides={server.banners}
          loop={true}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination",
            bulletActiveClass: "sw_active",
            renderBullet: (index, className) => {
              console.log("Bullet", { index, className });
              return ReactDOMServer.renderToStaticMarkup(
                <div
                  className={className}
                  style={{
                    margin: "8px",
                    boxSizing: "border-box",
                    transition: "all 0.35s ease-in",
                    display: "inline-block",
                    position: "static",
                    width: "10px",
                    height: "10px",
                    borderRadius: "5px",
                    background: "orange",
                  }}></div>
              );
            },
            clickable: true,
          }}
          slidesPerView={1}
          slideElement={(slide) => (
            <div
              style={{
                background: "red",
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}>
              <img style={{ width: "100%", height: "100%" }} src={slide.img} />
            </div>
          )}
        />
      </Box>
      <HotOffers resourcePath={"http://127.0.0.1:4001/hot-offer/1"} />
      <HotOffers resourcePath={"http://127.0.0.1:4001/hot-offer/2"} />
    </Box>
  );
}
