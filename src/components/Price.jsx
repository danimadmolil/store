import { Badge, Button, Grid, Typography } from "@mui/material";
import React from "react";

export default function Price({ off, realPrice, clientPrice }) {
  const offPercent = (clientPrice / realPrice) * 100;
  return (
    <Grid container direction={"column"} gap={1} sx={{ direction: "ltr" }}>
      <Grid item container>
        <Badge
          color="primary"
          sx={{
            "& .MuiBadge-badge": {
              transform: "none",
              position: "static",
              marginRight: 2,
            },
          }}
          badgeContent={Math.round(offPercent) + "%"}
        />
        <Typography
          className="real_price"
          sx={{ textDecorationLine: "line-through", color: "text.disabled" }}>
          {realPrice}
        </Typography>
      </Grid>
      <Typography>{clientPrice}</Typography>
      <Grid></Grid>
    </Grid>
  );
}
