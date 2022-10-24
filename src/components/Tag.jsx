import { Badge } from "@mui/material";
import React from "react";
import "./Tag";
export default function Tag({
  value,
  variant,
  rootStyle = {},
  sx = {},
  ...restProps
}) {
  return (
    <Badge
      color="primary"
      badgeContent={value}
      sx={{
        "& .MuiBadge-badge": {
          transform: "none",
          position: "static",
          borderRadius: variant === "rectangular" ? "4px" : "50px",
          ...rootStyle,
        },
        ...sx,
      }}
      {...restProps}></Badge>
  );
}
