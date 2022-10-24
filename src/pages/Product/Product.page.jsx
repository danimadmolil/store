import React, { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  ClickAwayListener,
  createStyles,
  Divider,
  FormLabel,
  Grid,
  IconButton,
  Input,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  styled,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import {
  Add,
  ArrowDropDown,
  ChatBubbleRounded,
  CircleSharp,
  DeliveryDining,
  Favorite,
  Instagram,
  Share,
  Star,
} from "@mui/icons-material";
import TabsWithScroll from "../../components/TabsWithScroll";
import Price from "../../components/Price";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProductComment from "../../components/ProductComment";
import BulletDivider from "../../components/BulletDivider";
import { postRequest } from "../../auth/service/request";
import useUser from "../../user/hooks/useUser";
import OrderProduct from "../../user/components/OrderProduct";
const ProductContainer = styled(Box)(({ theme }) => ({
  maxWidth: "1151px",
  height: "auto",
  width: "100%",
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {},
}));
const CustomDivider = styled("div")(({ theme }) => ({
  width: "45px",
  margin: " 6px 0 18px 0",
  height: " 4px",
  background: [theme.palette.primary.main],
}));
const linkStyle = createStyles({
  display: "inline-block",
  color: "cyan",
  textDecoration: "none",
  fontWeight: "bold",
});
const attributes = [
  { id: 1, title: "فناوری صفحه نمایش", value: "ips" },
  { id: 2, title: "اندازه ", value: "6.2" },
  { id: 2, title: "رزولوشن عکس", value: "16 مگاپیکسل" },
  { id: 4, title: "نسخه سیستم عامل", value: "android 11" },
];
const colorVariants = [
  { id: 1, variant: "black", color: "black", default: true },
  { id: 2, variant: "silver", color: "silver" },
  { id: 3, variant: "red", color: "red" },
];
export default function ProductPage() {
  const { productId, ...rest } = useParams();
  
  const { user } = useUser();
  const { data } = useQuery(
    ["product", productId],
    async () => {
      return fetch(`http://localhost:4001/product/${productId}`).then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(
          `failed to get data from =>  http://localhost:4001/product/${productId}`
        );
      });
    },
    { networkMode: "always" }
  );
  const mutation = useMutation(
    (data) => {
      return postRequest("http://localhost:4001/product/comment", {
        body: {
          productId,
          comment: data,
        },
      });
    },
    {
      onSuccess(a, b, c) {
        qc.invalidateQueries(["product", productId]);
      },
      networkMode: "always",
    }
  );
  const [commentAccordion, setCommentAccordion] = useState(false);
  function toggleCommentAccordion() {
    setCommentAccordion((prevState) => !prevState);
  }

  const { colorVariant, setColorVariant } = useState("");
  const theme = useTheme();
  console.log({ rest });
  const commentInputRef = useRef(null);
  const qc = useQueryClient();
  function submitComment() {
    mutation.mutate(commentInputRef.current.value);
  }

  return (
    <ProductContainer>
      <Header />
      {/** 6.6 / 5.4 */}
      <Grid
        gap={"16px"}
        flexWrap={"nowrap"}
        direction={"row"}
        justifyContent={"space-between"}
        container
        sx={{
          mt: 8,
          direction: "rtl",
          width: "100%",
          height: "auto",
          [theme.breakpoints.down("md")]: {
            flexFlow: "column nowrap",
            padding: "0 17px",
          },
          [theme.breakpoints.down("sm")]: {
            padding: "0 8px",
          },
        }}>
        <Paper
          component={Grid}
          className="product_media__container"
          container
          direction={"column"}
          item
          lg={4.25}
          md={4.25}
          sm={12}
          xs={12}
          sx={{ bgcolor: "", height: "auto" }}>
          <Stack
            direction={"row"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            sx={{
              height: "34px",
            }}>
            <Typography color={"primary"}>پیشنهاد شگفت انگیز</Typography>
            <Typography className="hot_offer_elapsed-time">
              00 : 12 : 59
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              width: "100%",
              height: "389px",
              direction: "inherit",
              [theme.breakpoints.down("md")]: {
                flexFlow: "column nowrap",
              },
            }}
            justifyContent="space-between">
            <Stack
              direction={"column"}
              sx={{
                width: "22px",
                padding: "2px",
                boxSizing: "border-box",
                [theme.breakpoints.down("md")]: {
                  flexFlow: "row wrap",
                  width: "100%",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                },
              }}>
              <IconButton>
                <Add />
              </IconButton>
              <IconButton>
                <Favorite />
              </IconButton>
              <IconButton>
                <Share />
              </IconButton>
              <IconButton>
                <Instagram />
              </IconButton>
              <IconButton>
                <ChatBubbleRounded />
              </IconButton>
            </Stack>
            <Box
              component={"img"}
              sx={{
                objectFit: "cover",
                width: "335px",
                height: "100%",
                [theme.breakpoints.down("md")]: {
                  width: "100%",
                },
              }}
              src={
                "https://dkstatics-public.digikala.com/digikala-adservice-banners/16f6cf08b3951e04597f3a955704bf7f2384a892_1656759442.jpg?x-oss-process=image/quality,q_95"
              }
            />
          </Stack>
        </Paper>
        <Grid
          direction={"column"}
          container
          item
          xl={7.75}
          lg={7.75}
          md={7.75}
          sx={{ bgcolor: "", height: "auto" }}>
          {/**general detail of product */}
          <Paper
            className="general_detail"
            sx={{
              order: 1,
              boxSizing: "border-box",
              width: "65%",
              height: "auto",
              paddingRight: "17px",
              paddingBottom: "12px",
              display: "flex",
              flexFlow: "column",
              [theme.breakpoints.down("md")]: {
                width: "100%",
              },
            }}>
            <Breadcrumbs sx={{ fontSize: "13px" }}>
              <li>گوشی موبایل</li>
              <li>آنر</li>
            </Breadcrumbs>
            <Typography>
              گوشی موبایل آنر مدل x9 5G دوسیم کارت ظرفیت 256 گیگابایت و رم 8
              گیگابایت
            </Typography>
            <Divider
              sx={{
                marginTop: "17px",
                "::before": { top: 0, width: "0px" },
                color: "text.secondary",
                fontSize: "12px",
                "::after": { top: 0, paddingLeft: "calc(8px * 1.2);" },
                ".MuiDivider-wrapper": {
                  paddingRight: 0,
                },
              }}
              orientation="horizontal"
              textAlign="left">
              Honor X9 5G
            </Divider>
            <Stack
              className={"reviews"}
              direction={"row"}
              sx={{ fontSize: "12px", marginTop: "17px" }}>
              <Stack direction="row" alignItems={"center"} className="rating">
                <Star sx={{ color: "#ffca00", fontSize: "16px" }} />
                <BulletDivider />
                <Typography sx={{ fontSize: "14px" }} className="rate_value">
                  3.5
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "text.secondary",
                    paddingRight: "5px",
                  }}
                  className="rate_count">
                  (12)
                </Typography>
                <BulletDivider />
                <Typography sx={{ fontSize: "inherit" }}>12 دیدگاه</Typography>
                <BulletDivider />
                <Typography sx={{ fontSize: "inherit" }}>51 پرسش </Typography>
              </Stack>
            </Stack>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "14px",
                marginTop: "8px",
              }}
              className="recommendation_status">
              (7.5%) از کاربران این محصول را پیشنهاد کردند
            </Typography>

            <Stack direction="row">
              <Typography sx={{ fontWeight: "bold" }}>{"رنگ :"}</Typography>
              <Typography
                className="product_color"
                sx={{ paddingRight: "8px" }}>
                {" قرمز"}
              </Typography>
            </Stack>
            <Stack direction={"row"}>
              <RadioGroup
                className="color_variant"
                sx={{ flexFlow: "row" }}
                value={colorVariant}
                onChange={(e, v) => setColorVariant(v)}>
                {colorVariants.map((_colorVariant) => (
                  <Radio
                    key={_colorVariant.id}
                    value={_colorVariant.variant}
                    icon={<CircleSharp sx={{ color: _colorVariant.color }} />}
                    checkedIcon={
                      <CircleSharp
                        stroke="black"
                        strokeWidth="3px"
                        sx={{ color: _colorVariant.color }}
                      />
                    }
                  />
                ))}
              </RadioGroup>
            </Stack>
          </Paper>
          {/* product attributes */}
          <Paper
            className="product_attributes"
            sx={{
              order: 2,
              boxSizing: "border-box",
              width: "65%",
              paddingRight: "17px",
              display: "block",
              marginTop: "4px",
              [theme.breakpoints.down("md")]: {
                order: 3,
                width: "100%",
              },
            }}>
            <Typography>ویژگی ها</Typography>
            <Box component={"ul"} sx={{ paddingRight: "18px" }}>
              {attributes.map((attribute) => (
                <Typography component={"li"} sx={{ color: "text.secondary" }}>
                  {attribute.title} : <b>{attribute.value}</b>
                </Typography>
              ))}
            </Box>
          </Paper>
          <Paper
            className="product_sellers"
            sx={{
              order: 3,
              width: "34%",
              alignSelf: "stretch",
              borderRadius: 2,
              height: "100%",
              padding: "10px 8px",
              boxSizing: "border-box",
              [theme.breakpoints.down("md")]: {
                order: 2,
                height: "auto",
                width: "100%",
              },
            }}>
            <Stack
              direction={"row"}
              sx={{ padding: "8px 0" }}
              justifyContent="space-between">
              <Typography>فروشنده</Typography>
              <Typography sx={{ color: "cyan", fontSize: "14px" }}>
                1 {"فروشنده دیگر"}
              </Typography>
            </Stack>
            <Stack>
              <Stack direction={"row"}>
                <Box
                  component={"img"}
                  sx={{ width: "25px", height: "25px" }}
                  src={""}
                />
                <Typography sx={{ paddingRight: "25px" }}>دیجی کالا</Typography>
              </Stack>
              <Grid container direction={"row"} alignItems="center">
                <Typography class="sates" sx={{ fontSize: "14px" }}>
                  {" "}
                  <Typography component={"b"} sx={{ color: "#1dff27" }}>
                    90%{" "}
                  </Typography>
                  رضایت از کالا
                </Typography>
                <Box
                  sx={{
                    height: "25px",
                    width: "3px",
                    background: "gray",
                    margin: "0 4px",
                  }}></Box>
                <Typography>عملکرد عالی</Typography>
              </Grid>
            </Stack>
            <Divider variant="middle" sx={{ margin: "18px 0" }} />
            <Price realPrice={8399000} clientPrice={799000} />
            <OrderProduct productId={productId} />
          </Paper>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 8 }} variant="middle"></Divider>
      <Grid
        container
        sx={{ height: "40px" }}
        direction={"row"}
        justifyContent={"space-evenly"}
        alignItems={"center"}>
        {new Array(6).fill(undefined).map((item) => (
          <Grid
            direction={"row"}
            sx={{ display: "inline-flex" }}
            item
            gap={"8px"}>
            <Typography sx={{ color: "text.secondary" }}>
              تحویل سریع اکسپرس
            </Typography>
            <DeliveryDining sx={{ color: "text.secondary" }} />
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ mt: 2, mb: 2 }} variant="middle"></Divider>
      <TabsWithScroll
        tabs={[
          {
            id: 1,
            value: "introduction",
            title: "معرفی",
            section: "#introduction",
          },
          {
            id: 2,
            value: "special_review",
            title: "برسی تخصصی",
            section: "#special_review",
          },
          {
            id: 3,
            value: "detail",
            title: "مشخصات",
            section: "#detail",
          },
          {
            id: 4,
            value: "reviews",
            title: "برسی",
            section: "#reviews",
          },
          {
            id: 4,
            value: "questions",
            title: " سوالات کاربران",
            section: "#questions",
          },
        ]}
      />
      <Paper
        id={"introduction"}
        sx={{
          direction: "rtl",
          boxSizing: "border-box",
          padding: "4px 17px",
          width: "100%",
          height: "auto",
          paddingBottom: "18px",
          mt: 3,
        }}>
        <Typography
          component={"h3"}
          sx={{
            fontWeight: "bold",
            paddingTop: "20px",
          }}>
          معرفی
        </Typography>
        <CustomDivider />
        <Typography
          textOverflow={"ellipsis"}
          sx={{ color: "text.secondary", textAlign: "justify" }}>
          یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی متنوع،
          باکیفیت و دارای قیمت مناسب را در مدت زمانی کوتاه به دست مشتریان خود
          برساند و ضمانت بازگشت کالا هم داشته باشد؛ ویژگی‌هایی که فروشگاه
          اینترنتی دیجی‌کالا سال‌هاست بر روی آن‌ها کار کرده و توانسته از این
          طریق مشتریان ثابت خود را داشته باشد.یک خرید اینترنتی مطمئن، نیازمند
          فروشگاهی است که بتواند کالاهایی متنوع، باکیفیت و دارای قیمت مناسب را
          در مدت زمانی کوتاه به دست مشتریان خود برساند و ضمانت بازگشت کالا هم
          داشته باشد؛ ویژگی‌هایی که فروشگاه اینترنتی دیجی‌کالا سال‌هاست بر روی
          آن‌ها کار کرده و توانسته از این طریق مشتریان ثابت خود را داشته باشد.
        </Typography>
        <Link to={`/product/${productId}/introduction`} style={linkStyle}>
          بیشتر
        </Link>
      </Paper>
      <Paper
        id={"special_review"}
        sx={{
          boxSizing: "border-box",
          direction: "rtl",
          width: "100%",
          height: "300px",
          mt: 3,
          padding: "4px 17px",
        }}>
        <Typography
          component={"h3"}
          sx={{
            fontWeight: "bold",
            paddingTop: "20px",
          }}>
          {"برسی تخصصی"}
        </Typography>
        <CustomDivider />
        <Typography
          sx={{
            color: "text.secondary",
            textAlign: "justify",
          }}>
          یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی متنوع،
          باکیفیت و دارای قیمت مناسب را در مدت زمانی کوتاه به دست مشتریان خود
          برساند و ضمانت بازگشت کالا هم داشته باشد؛ ویژگی‌هایی که فروشگاه
          اینترنتی دیجی‌کالا سال‌هاست بر روی آن‌ها کار کرده و توانسته از این
          طریق مشتریان ثابت خود را داشته باشد.یک خرید اینترنتی مطمئن، نیازمند
          فروشگاهی است که بتواند کالاهایی متنوع، باکیفیت و دارای قیمت مناسب را
          در مدت زمانی کوتاه به دست مشتریان خود برساند و ضمانت بازگشت کالا هم
          داشته باشد؛ ویژگی‌هایی که فروشگاه اینترنتی دیجی‌کالا سال‌هاست بر روی
          آن‌ها کار کرده و توانسته از این طریق مشتریان ثابت خود را داشته باشد.
        </Typography>
      </Paper>
      <Paper
        id={"detail"}
        sx={{
          direction: "rtl",
          boxSizing: "border-box",
          padding: "4px 17px",
          width: "100%",
          height: "auto",
          paddingBottom: "18px",
          mt: 3,
        }}>
        <Typography
          component={"h3"}
          sx={{
            fontWeight: "bold",
            paddingTop: "20px",
          }}>
          مشخصات
        </Typography>
        <CustomDivider />
        <Grid container sx={{ width: "500px", margin: "0 auto" }}>
          <Grid
            item
            container
            justifyContent={"space-between"}
            sx={{ mt: "25px" }}>
            <Typography>ابعاد</Typography>
            <Box>
              <Typography>1266.56 X 1690 X 45</Typography>
              <Divider variant="fullWidth" color="gray" />
            </Box>
          </Grid>
          <Grid
            item
            container
            justifyContent={"space-between"}
            sx={{ mt: "25px" }}>
            <Typography>توضیحات کارت حافظه جانبی</Typography>
            <Typography>1266.56 X 1690 X 45</Typography>
          </Grid>
        </Grid>
        <Link to={`/product/${productId}/introduction`} style={linkStyle}>
          بیشتر
        </Link>
      </Paper>
      {/*
            users comments
        */}
      <Grid
        component={Paper}
        id={"reviews"}
        sx={{
          width: "100%",
          mt: 3,
          boxSizing: "border-box",
          padding: "4px 17px",
          paddingBottom: "28px",
        }}>
        {/**
        comment section header
      */}
        <Grid
          sx={{ marginBottom: "22px" }}
          container
          className="submit_comment">
          {/**
          comment section header left side
      */}
          <Grid
            className="comment_header-left"
            xl={9}
            lg={9}
            md={12}
            sm={12}
            xs={12}
            container
            direction={"column"}>
            <Grid
              container
              dir="rtl"
              sx={{ paddingTop: "15px", paddingRight: "25px" }}>
              <Typography dir="rtl">{"(87%) 10 نفر"}</Typography>
              <Typography>
                {"از کاربران این محصول را پیشنهاد کرده اند"}
              </Typography>
            </Grid>
            <Link style={{ ...linkStyle, display: "block" }}>
              {"مشاهده همه"}
            </Link>
          </Grid>
          {/**
          comment section header right side
      */}
          <Grid
            className="comment_header-right"
            container
            direction={"column"}
            sx={{ padding: "0 8px", boxSizing: "border-box" }}
            xl={3}
            lg={3}
            md={12}
            sm={12}
            xs={12}>
            <Stack
              dir="rtl"
              direction={"row"}
              alignItems="center"
              sx={{ width: "auto", padding: "0 8px" }}>
              <Typography
                sx={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  padding: "0 10px",
                }}>
                3.9
              </Typography>
              <Typography x={{ color: "text.primary" }}>{"از"}</Typography>
              <Typography
                sx={{
                  color: "text.primary",
                  padding: "0 4px",
                  fontSize: "12px",
                }}>
                {"5"}
              </Typography>
            </Stack>
            <Typography
              sx={{
                fontSize: "14px",
                color: "text.secondary",
                textAlign: "center",
              }}
              component="h1">
              {"از مجموع 12 امتیاز"}
            </Typography>
            <Typography
              dir="rtl"
              sx={{
                padding: "18px 0",
                color: "text.secondary",
                fontSize: "14px",
              }}>
              {"شما هم درباره این کالا دیدگاه ثبت کنید"}
            </Typography>
            <Button
              onClick={toggleCommentAccordion}
              fullWidth
              variant="outlined"
              color="primary"
              sx={{ padding: "8px 8px" }}>
              <Typography> {"ثبت دیدگاه"}</Typography>
            </Button>
          </Grid>
        </Grid>
        <Accordion expanded={commentAccordion}>
          <AccordionSummary></AccordionSummary>
          <AccordionDetails sx={{ background: "gray" }}>
            <FormLabel>comment :</FormLabel>
            <Input
              inputRef={commentInputRef}
              id="input"
              name="comment"
              type="text"
            />

            <Button variant="contained" onClick={submitComment}>
              ثبت
            </Button>
          </AccordionDetails>
        </Accordion>
        <Grid container>
          {mutation.isLoading && <CircularProgress sx={{ margin: "0 auto" }} />}
          <Grid item xl={9} lg={9} md={12} sm={12} xs={12}>
            {data &&
              data.Comment.map((comment) => {
                return (
                  <ProductComment
                    comment={comment.comment}
                    user={comment.user.name}
                  />
                );
              })}
          </Grid>
          <Grid xl={3} lg={3} md={12} sm={12} xs={12} item container></Grid>
        </Grid>
      </Grid>
      <Paper
        id={"questions"}
        sx={{ width: "100%", height: "300px", mt: 3 }}></Paper>
    </ProductContainer>
  );
}
