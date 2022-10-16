import React from "react";
import { styled } from "@mui/material";
import { CircleSharp } from "@mui/icons-material";
const Divider = styled(CircleSharp)(({ theme }) => ({
  color: [theme.palette.text.disabled],
  fontSize: "5px",
  padding: "0 8px",
}));
export default function BulletDivider() {
  return <Divider />;
}
