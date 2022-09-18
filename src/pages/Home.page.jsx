import {
  Card,
  CardHeader,
  CardMedia,
  Box,
  Link,
  CardActionArea,
  CardContent,
  Typography,
  useTheme,
  Grid,
  Paper,
  ButtonBase,
  Container,
} from "@mui/material";
import * as ReactDOMServer from "react-dom/server";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import SwiperContainer from "../components/SwiperContiner";
import server from "../server.json";
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
      <Box
        sx={{
          width: "95%",
          maxWidth: "1304px",
          height: "286px",
          // padding: "20px 2px",
          margin: "24px auto 0px  auto",
          boxSizing: "border-box",
          background: "#ef4056",
          padding: "24px 6px",
          borderRadius: 4,
        }}>
        <Grid
          container
          direction={"row"}
          wrap={"nowrap"}
          sx={{
            borderRadius: 4,
            width: "100%",
            height: "238px",
          }}>
          <Grid item lg={9} md={10} sm={10} xs={12}>
            <Paper
              elevation={0}
              sx={{
                boxShadow: "none",
                height: "100%",

                background: "transparent",
                borderRadius: 2,
              }}>
              <SwiperContainer
                gap={8}
                breakpoints={{
                  1600: { slidesPerView: 5 },
                  1200: { slidesPerView: 4 },
                  900: {
                    slidesPerView: 3,
                  },
                  700: {
                    slidesPerView: 2,
                  },
                  600: {
                    slidesPerView: 1,
                  },
                  0: {
                    slidesPerView: 1,
                  },
                }}
                height={["100%", "100%", "100%", "100%"]}
                slides={server.banners}
                slidesPerView={6}
                slideElement={(slide, isActive = false, progress) => {
                  console.log("prog", progress);
                  return (
                    <Card
                      sx={{
                        maxWidth: "100%",
                        width: "100%",
                        height: "100%",
                        borderRadius: 4,
                        maxWidth: 345,
                        position: "relative",
                        transition: "all 0.4s",
                      }}>
                      <Link
                        to="/home"
                        style={{
                          width: "100%",
                          height: "100%",
                          top: 0,
                          left: 0,
                          position: "absolute",
                          zIndex: 10000,
                        }}></Link>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={slide.img}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Product name
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles,
                            with over 6,000 species, ranging across all
                            continents except Antarctica
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  );
                }}
              />
            </Paper>
          </Grid>
          <Grid
            item
            container
            lg={3}
            md={2}
            sm={2}
            sx={{
              padding: "8px 0px",
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }}
            direction="column"
            alignItems={"center"}
            justifyContent={"space-around"}>
            <Typography component={"h2"}>پیشنهاد شگفت انگیز</Typography>
            <img
              height={"114px"}
              width={"114px"}
              src="https://www.digikala.com/statics/img/png/specialCarousel/box.png"
            />
            <ButtonBase
              disableRipple
              variant="contained"
              sx={{ color: "white", fontSize: 20 }}>
              {"< "}
              مشاهده
            </ButtonBase>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
