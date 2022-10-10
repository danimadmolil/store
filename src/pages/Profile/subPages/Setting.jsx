import React from "react";
import { Grid, Typography } from "@mui/material";

import ThemeToggle from "../../../components/ThemeToggle";

export default function Setting() {
  return (
    <div>
      <Grid container>
        <Grid lg={5}>
          <Typography>رنگ بندی</Typography>
        </Grid>
        <Grid lg={7}>
          <ThemeToggle />
        </Grid>
      </Grid>
    </div>
  );
}
