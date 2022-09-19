import React from "react";
import SwiperContainer from "./SwiperContiner";
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
export default function HotOffers({ hotOffer }) {
  const theme = useTheme();
  return (
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
              slides={hotOffer.HotOffersOnProduct}
              slidesPerView={6}
              slideElement={({ product }, isActive = false, progress) => {
                console.log("prog", progress);
                return (
                  <Card
                    key={product.id}
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
                      to={product.link}
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
                        image={product.img}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.description}
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
          <Typography component={"h2"}>{hotOffer.title}</Typography>
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
  );
}
