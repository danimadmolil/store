import { Badge, Divider, Grid, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import Tag from "./Tag";
import BulletDivider from "./BulletDivider";
import {
  BadgeRounded,
  Circle,
  MenuRounded,
  SwapVerticalCircleSharp,
  ThumbUp,
} from "@mui/icons-material";
export default function ProductComment({
  comment,
  user,
  date,
  relation = "کاربر",
  variant = { color: "silver" },
}) {
  return (
    <Grid direction={"column"} dir="rtl">
      <Grid direction={"row"}>
        <Tag color={"success"} value={"5.0"} variant="rectangular"></Tag>
        <Typography component={"span"} sx={{ paddingRight: 1 }}>
          {comment}
        </Typography>
      </Grid>
      <Grid
        container
        direction={"column"}
        item
        sx={{ paddingRight: "25px", paddingBlock: "25px" }}>
        <Stack
          sx={{ width: "100%" }}
          direction="row"
          justifyContent={"space-evenly"}
          alignItems="center">
          <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
            {"18 مهر 1401"}
          </Typography>
          <BulletDivider />
          <Typography
            sx={{
              fontSize: "12px",
              color: "text.secondary",
              padding: "0px 8px",
            }}>
            {user}
          </Typography>
          <Tag value={relation} sx={{ color: "gray" }} />
          <IconButton sx={{ color: "text.primary", marginRight: "auto" }}>
            <MenuRounded />
          </IconButton>
        </Stack>
        <Divider />
        <Stack direction={"row"} sx={{ paddingTop: "20px" }}>
          <ThumbUp color="success" sx={{ marginRight: "-2px" }} />
          <Typography sx={{ paddingRight: "20px" }} component={"span"}>
            پیشنهاد میکنم
          </Typography>
        </Stack>
        <Typography sx={{ padding: "25px 0" }}>
          عالی ممنون از دیجی کالا
        </Typography>
        <Divider />
        <Stack
          direction={"row"}
          alignItems={"center"}
          sx={{ padding: "8px 0" }}>
          <BadgeRounded />
          <Typography sx={{ fontSize: "12px" }}>دیجی کالا</Typography>
          <BulletDivider />
          <Circle sx={{ color: variant.color }} />
        </Stack>
      </Grid>
      <Divider />
    </Grid>
  );
}
