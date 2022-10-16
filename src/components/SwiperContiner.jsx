import React, { useRef, useState } from "react";
import { Divider, Paper, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { style } from "@mui/system";
import {
  Navigation,
  Pagination,
  Autoplay,
  FreeMode,
  Zoom,
} from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import "./SwiperContainer.css";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
const BannerContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "sx" && prop !== "color",
})(({ theme, height }) => ({
  width: "100%",
  maxWidth: "1920px",
  margin: "0 auto",
  background: "transparent",
  backgroundColor: "transparent",
  height: height || "300px",
  [theme.breakpoints.up("md")]: {
    height: height || "400px",
  },
  [theme.breakpoints.down("md")]: {
    height: height || "300px",
  },
  [theme.breakpoints.down("sm")]: {
    height: height || "200px",
  },
}));
export default function SwiperContainer({
  breakpoints = {},
  slides = [],
  slideElement = style("div"),
  slidesPerView = 1,
  height,
  gap = 0,
  pagination,
  prevEl,
  ...rest
}) {
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const [progress, setProgress] = useState(0);
  return (
    <BannerContainer elevation={0} height={height}>
      <Swiper
        preventClicks
        // observer
        grabCursor
        // cssMode={true}
        // centeredSlides={true}
        // loop={true}
        // autoplay={{
        //   pauseOnMouseEnter: true,
        //   disableOnInteraction: false,
        //   delay: 2000,
        // }}
        watchSlidesProgress
        zoom
        modules={[FreeMode, Pagination, Navigation, Autoplay, Zoom]}
        onProgress={(swiper, progress) => {
          setProgress(progress);
        }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onInit={(swiper) => {
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
         
        }}
        pagination={
          (typeof pagination === "object" || pagination === true) && pagination
        }
        spaceBetween={gap}
        breakpoints={breakpoints}
        direction="horizontal"
        slidesPerView={slidesPerView}
        style={{ height: "100%" }}
        {...rest}>
        {slides &&
          slides.map((slide, index) => (
            <SwiperSlide
              key={slide.id}
              style={{
                overflow: "hidden",
              }}>
              {({ isActive, isNext, isPrev, ...rest }) => {
                return slideElement(slide, isActive, progress);
              }}
            </SwiperSlide>
          ))}
        <Grid
          container
          direction={"row"}
          sx={{
            height: ["30px", "40px", "55px", "60px", "60px"],
            width: ["64px", "74px", "90px", "124px", "124px"],
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 auto",
            position: "absolute",
            top: "95%",
            left: "95%",
            transform: "translate(-110%,-124%)",
            zIndex: 1000,
          }}>
          <Paper
            elevation={0}
            ref={prevRef}
            className="prev"
            sx={{
              width: ["25px", "30px", "40px", "50px", "50px"],
              height: ["25px", "30px", "40px", "50px", "50px"],
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50px",
              background: "white",
            }}>
            <ArrowLeft />
          </Paper>
          <Divider flexItem />
          <Paper
            elevation={0}
            ref={nextRef}
            className="next"
            sx={{
              width: ["25px", "30px", "40px", "50px", "50px"],
              height: ["25px", "30px", "40px", "50px", "50px"],
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50px",
              background: "white",
            }}>
            <ArrowRight />
          </Paper>
        </Grid>
      </Swiper>
    </BannerContainer>
  );
}
